const Sequelize = require("sequelize");

const connection = new Sequelize("projetoapicompass", "root", "0212", {
  host: "localhost",
  dialect: "mysql",
  define:{
    timestamps: false
  }
});

module.exports = connection;
