const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/database.js");
const bodyParser = require("body-parser");
const Cidade = require("./database/Cidade");
const Cliente = require("./database/Cliente");
const {cadastrarCidade, findCidadeByName, findCidadebyEstado} = require("./controllers/CidadeController.js");
const {cadastrarClientes, findClienteByName, findClienteById, deleteClientById, patchClienteName} = require("./controllers/ClienteController.js");


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

//Rota para cadastrar uma cidade
app.post("/cidades", cadastrarCidade);

//Rota para cadastrar um cliente
app.post("/clientes", cadastrarClientes);

//Rota para buscar uma cidade pelo nome
app.get("/cidades/:nome", findCidadeByName);

//Rota para buscar uma cidade pelo estado
app.get("/estados/:estado/cidades", findCidadebyEstado);

//Rota para buscar um cliente pelo id
app.get("/clientes/:id", findClienteById)

//Rota para buscar um cliente pelo nome (utilizando query params)
app.get("/clientes", findClienteByName);

//Rota para deletar um cliente pelo id
app.delete("/clientes/:id", deleteClientById); 

app.patch("/clientes", patchClienteName);

app.listen(3001, () => {
  console.log("Servidor iniciado");
});
