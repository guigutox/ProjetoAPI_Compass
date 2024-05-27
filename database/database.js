const Sequelize = require("sequelize");

const connection = new Sequelize("projetoapicompass", "root", "0212", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
