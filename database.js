const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("beer-pong", "user", "password", {
  dialect: "sqlite",
  host: "./beerpong.sqlite",
});

module.exports = sequelize;