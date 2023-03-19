const express = require("express");
const { Op } = require("sequelize");
const PointRouter = express.Router();
const Game = require("../models/GameModel");
const { makeGameId, makePlayerCode } = require("../helpers/helper");
const Codes = require("../models/CodesModel");

PointRouter.route("/").post(async (req, res) => {
  const { device, point } = req.body;
  try {
    const io = req.app.get("io");
    const game = await Game.findOne({
      where: {
        [Op.or]: { deviceOne: parseInt(device), deviceTwo: parseInt(device) },
        gameFinished: false,
      },
    });
    if (device === game.dataValues.deviceOne) {
      if (game.dataValues.playerOnePoints < 6) {
        const playerOnePoints = +game.dataValues.playerOnePoints + 1;
        io.sockets.emit("point", {
          point: parseInt(point),
          device,
          gameId: game.dataValues.gameId,
          game,
          playerOnePoints: +game.playerOnePoints+1,
          playerTwoPoints: +game.playerTwoPoints,
        });
        await Game.update(
          { playerOnePoints },
          { where: { gameId: game.dataValues.gameId } }
        );
      }
      console.log("PLAYER ONE SCORED!");
    } else if (device === game.dataValues.deviceTwo) {
      if (game.dataValues.playerTwoPoints < 6) {
        const playerTwoPoints = +game.dataValues.playerTwoPoints + 1;
        io.sockets.emit("point", {
          point: parseInt(point),
          device,
          gameId: game.dataValues.gameId,
          playerOnePoints: +game.playerOnePoints,
          playerTwoPoints: +game.playerTwoPoints+1,
        });
        await Game.update(
          { playerTwoPoints },
          { where: { gameId: game.dataValues.gameId } }
        );
      }
      console.log("PLAYER TWO SCORED!");
    }
    res.status(201);
    res.send(game);
  } catch (err) {
    res.status(400)
    res.send(err)
  }
});

module.exports = PointRouter;
