const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/database.js");
const bodyParser = require("body-parser");
const Cidade = require("./database/Cidade");
const Cliente = require("./database/Cliente");
const cadastrarCidade = require("./controller/CidadeController");


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
    cadastrarCidade(req, res);
});

app.post("/cadastrarclientes", async (req, res) => {
  const { id, nome_completo, sexo, data_nascimento, idade, cidade_id } =
    req.body;

  const checks = [
    {
      name: "id",
      value: id,
      typeExpected: "number",
      errorMessage: "Id deve ser um número",
    },
    {
      name: "nome_completo",
      value: nome_completo,
      typeExpected: "string",
      errorMessage: "Nome deve ser uma string",
    },
    {
      name: "sexo",
      value: sexo,
      typeExpected: "string",
      errorMessage: "Sexo deve ser uma string",
    },
    {
      name: "data_nascimento",
      value: data_nascimento,
      typeExpected: "string",
      errorMessage: "Data de nascimento deve ser uma string",
    },
    {
      name: "idade",
      value: idade,
      typeExpected: "number",
      errorMessage: "Idade deve ser um número",
    },
    {
      name: "cidade_id",
      value: cidade_id,
      typeExpected: "number",
      errorMessage: "Id da Cidade deve ser um número",
    },
  ];

  for (let check of checks) {
    if (!check.value || check.value === null || check.value === undefined) {
      return res.status(400).json({ error: `${check.name} não foi informado` });
    }
    if (typeof check.value !== check.typeExpected) {
      return res.status(400).json({ error: `${check.errorMessage}` });
    }
    if (check.typeExpected === "number" && check.value <= 0)
      return res.status(400).json({ error: `${check.name} deve ser maior que zero` });
  }

  try {
    const cidade = await Cidade.findOne({ where: { id: cidade_id } });
    if (!cidade) {
      return res.status(404).json({ error: "Cidade não encontrada" });
    }
    console.log("Cidade encontrada");

    const cliente = await Cliente.create({
      id: id,
      nome_completo: nome_completo,
      sexo: sexo,
      data_nascimento: data_nascimento,
      idade: idade,
      cidade_id: cidade_id,
    });

    res.status(201).json({ message: "Cliente criado com sucesso!" });
  } catch (err) {
    console.error("Erro ao criar cliente:", err); // Log para depuração
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Id do cliente ja existe" });
    } else {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
});

app.listen(3001, () => {
  console.log("Servidor iniciado");
});
