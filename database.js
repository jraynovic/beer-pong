const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("RadPong", "user", "password", {
  dialect: "sqlite",
  host: "./RadPongDb.sqlite",
});

module.exports = sequelize;