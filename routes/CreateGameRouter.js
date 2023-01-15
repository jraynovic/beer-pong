const express = require('express');
const GameRouter = express.Router();
const Game = require('../models/GameModel')
const { makeGameId, makePlayerCode } = require('../helpers/helper');

GameRouter.route('/new')
.post(async (req,res)=>{
  const { playerOne, deviceOne } = req.body;
  console.log(playerOne)
  console.log*deviceOne
  const io = req.app.get('io');
  const gameId = makeGameId();
  const game = await Game.create({gameId, playerOne, deviceOne})
  io.on("connection", socket => {
    socket.join(gameId);
  });
  res.status(201)  
  res.send({ ...game.dataValues })
})

GameRouter.route('/join')
.post(async (req,res)=>{
  const { playerTwo, gameId, deviceTwo } = req.body;
  const updatedGame = await Game.update({playerTwo, deviceTwo},{where:{gameId,gameFinished:false}})
  res.status(201)  
  res.send({...updatedGame })
})




module.exports = GameRouter