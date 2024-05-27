const Sequelize = require("sequelize");
const Connection = require("./database.js");
const Cidade = require("./Cidade");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");

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
  data_de_nascimento: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_cidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});


Cliente.belongsTo(Cidade, {
  foreignKey: "idCidade", allowNull: false
});
