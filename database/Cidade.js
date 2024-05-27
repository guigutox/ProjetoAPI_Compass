const Sequelize = require("sequelize");
const connection = require("./database.js");

//Define modelo de cidade
const Cidade = connection.define("cidades", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estado: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Cidade.sync({ force: false }).then(() => {
  console.log("Tabela criada");
});

module.exports = Cidade;