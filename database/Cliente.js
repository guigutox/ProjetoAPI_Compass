const Sequelize = require("sequelize");
const Connection = require("./database.js");
const Cidade = require("./Cidade");

const Cliente = Connection.define("clientes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome_completo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sexo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cidade_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//Usado para fazer relacionamento entre tabelas, no caso indica que o campo id_cidade e uma chave estrangeira vinda da model Cidade
Cliente.belongsTo(Cidade, {
  foreignKey: "id_cidade",
  allowNull: false,
});

module.exports = Cliente;