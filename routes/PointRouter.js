const express = require('express');
const { Op } = require('sequelize')
const PointRouter = express.Router();
const Game = require('../models/GameModel')
const { makeGameId, makePlayerCode } = require('../helpers/helper');
const Codes = require('../models/CodesModel');


PointRouter.route('/')
.post(async (req,res)=>{
  const { device, point } = req.body
  console.log(req.body)
  console.log('^^^BODY')
  const io = req.app.get('io')
  const game = await Game.findOne({where:{[Op.or]:{deviceOne: parseInt(device), deviceTwo:parseInt(device) }, gameFinished:false } } )
  if(device === game.dataValues.deviceOne){  
    if(game.dataValues.playerOnePoints <100){ 
      const playerOnePoints = +game.dataValues.playerOnePoints +1
      io.sockets.emit('point', {point:parseInt(point),device, gameId:game.dataValues.gameId})
      await Game.update({playerOnePoints},{where:{gameId:game.dataValues.gameId}}) 
    }
    console.log('PLAYER ONE SCORED!')
  }else if( device === game.dataValues.deviceTwo){
    if(game.dataValues.playerOnePoints <100){
      const playerTwoPoints = +game.dataValues.playerOnePoints +1
      io.sockets.emit('point', {point:parseInt(point),device, gameId:game.dataValues.gameId})
      await Game.update({playerTwoPoints},{where:{gameId:game.dataValues.gameId}})
    }
    console.log('PLAYER TWO SCORED!')
  }
  res.status(201)  
  res.send(game)
})

module.exports = PointRouter