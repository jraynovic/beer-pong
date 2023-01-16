const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    gameId:{
      type: DataTypes.STRING,
      unique:true
    },
    playerOne:{
      type: DataTypes.STRING
    },
    playerOneSocketId:{
      type: DataTypes.STRING
    },
    deviceOne:{
      type: DataTypes.INTEGER,    
    },
    playerOnePoints:{
      type: DataTypes.STRING
    },
    playerTwo:{
      type: DataTypes.STRING
    },
    playerTwoSocketId:{
      type: DataTypes.STRING
    },
    deviceTwo:{
      type: DataTypes.INTEGER,    
    },
    playerTwoPoints:{
      type: DataTypes.STRING
    },
    gameFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: "game",
  }
);

module.exports = Game;