const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("codeConnecter", "user", "password", {
  dialect: "sqlite",
  host: "./codeConnecterDb.sqlite",
});

module.exports = sequelize;