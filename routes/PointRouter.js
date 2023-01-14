const express = require('express');
const { Op } = require('sequelize')
const PointRouter = express.Router();
const Game = require('../models/GameModel')
const { makeGameId, makePlayerCode } = require('../helpers/helper');
const Codes = require('../models/CodesModel');


PointRouter.route('/')
.post(async (req,res)=>{
  const { device, point } = req.body
  const io = req.app.get('io')
  const game = await Game.findOne({where:{[Op.or]:{deviceOne:device, deviceTwo:device } } } )
  if(device === game.dataValues.deviceOne){
    if(game.dataValues.playerOnePoints <6){
      const playerOnePoints = +game.dataValues.playerOnePoints +1
      io.sockets.emit('point', parseInt(point))
      io.to(game.gameId).emit({player:'one',point});
      await Game.update({playerOnePoints},{where:{gameId:game.dataValues.gameId}})
    }
    console.log('PLAYER ONE SCORED!')
  }else if( device === game.dataValues.deviceTwo){
    io.to(game.gameId).emit({player:'two',point});
    console.log('PLAYER TWO SCORED!')
  }
  res.status(201)  
  res.send(game)
})

module.exports = PointRouter