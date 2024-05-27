const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/database.js");
const bodyParser = require("body-parser");
const Cidade = require("./database/Cidade");
const Cliente = require("./database/Cliente");

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

app.post("/cadastrarcidades", (req, res) => {
  let id = req.body.id;
  let nome = req.body.nome;
  let estado = req.body.estado;

  //array armazena os valores, tipos esperados e as mensagens derro
  const checks = [
    {
      name: "id",
      value: id,
      typeExpected: "number",
      errorMessage: "Id deve ser um número",
    },
    {
      name: "nome",
      value: nome,
      typeExpected: "string",
      errorMessage: "Nome deve ser uma string",
    },
    {
      name: "estado",
      value: estado,
      typeExpected: "string",
      errorMessage: "Estado deve ser uma string",
    },
  ];

  //verifica se todos os valores e sinaliza se houver algum erro
  for (let check of checks) {
    if (!check.value || check.value === null || check.value === undefined) {
      return res.status(400).json({ error: `${check.name} não foi informado` });
    }
    if (typeof check.value !== check.typeExpected) {
      return res.status(400).json({ error: `${check.errorMessage}` });
    }
  }

  //Verifica se ja existe o ID no banco, se não houver ele registra no banco
  Cidade.create({
    id: id,
    nome: nome,
    estado: estado,
  })
    .then(() => {
      res.status(200).json({ message: "Cidade criada com sucesso!" });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Id da cidade já existe" });
      } else {
        return res.status(500).json({ error: "Erro interno no servidor" });
      }
    });
});

app.listen(3001, () => {
  console.log("Servidor iniciado");
});
