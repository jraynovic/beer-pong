const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class Codes extends Model {}

Codes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    deviceId:{
      type: DataTypes.STRING,
    },
    number:{
        type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: "points",
  }
);

module.exports = Codes;