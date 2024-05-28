const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/database.js");
const bodyParser = require("body-parser");
const Cidade = require("./database/Cidade");
const Cliente = require("./database/Cliente");
const {cadastrarCidade, findCidadeByName, findCidadebyEstado} = require("./controller/CidadeController");
const {cadastrarClientes, findClienteByName} = require("./controller/ClienteController");


connection
  .authenticate()
  .then(() => {
    console.log("Conectado com o banco de dados");
  })
  .catch((erro) => {
    console.log(erro);
  });

app.use(cors());
app.use(express.static("public"));

//Configurações do body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});


app.post("/cadastrarcidades", cadastrarCidade);

app.post("/cadastrarclientes", cadastrarClientes);

app.get("/cidades/nome/:nome", findCidadeByName);

app.get("/cidades/estado/:estado", findCidadebyEstado);

app.get("/clientes/nome/:nome_completo", findClienteByName);

app.listen(3001, () => {
  console.log("Servidor iniciado");
});
