const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/database.js");

connection
  .authenticate()
  .then(() => {
    console.log("Conectado com o banco de dados");
  })
  .catch((erro) => {
    console.log(erro);
  });

app.listen(3001, () => {
  console.log("Servidor iniciado");
});
