const Cliente = require("../database/Cliente");
const Cidade = require("../database/Cidade");
const { validarCliente, validarNome } = require("../services/ClienteService");
const { query } = require("express");

async function cadastrarClientes(req, res) {
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

  const erro = validarCliente(res, checks);
  if (erro) return erro;

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
}


async function findClienteById(req, res) {
  const id = Number(req.params.id);

  console.log(typeof id);
  console.log(id)

  const checks = [
    {
      name: "id",
      value: id,
      typeExpected: "number",
    },
  ];

  const erro = validarNome(checks, res);
  if (erro) return erro;

  const cliente = await Cliente.findOne({ where: { id: id } });

  if (!cliente) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  } else {
    return res.status(200).json(cliente);
  }
}

async function findClienteByName(req, res) {

  const { nome_completo } = req.query;
  
  const checks = [
    {
      name: "nome completo",
      value: nome_completo,
      typeExpected: "string",
    },
  ];

  const erro = validarNome(checks, res);
  if (erro) return erro;

  const cliente = await Cliente.findAll({
    where: { nome_completo: nome_completo },
  });

  if (!cliente || cliente.length === 0) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  } else {
    return res.status(200).json(cliente);
  }
}

async function deleteClientById(req, res) {

  const id = Number(req.params.id);

  const checks = [
    {
      name: "id",
      value: id,
      typeExpected: "number",
    },
  ];

  const erro = validarNome(checks, res);
  if (erro) return erro;

  const cliente = await Cliente.destroy({ where: { id: id } });
  if (!cliente) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  } else {
    return res.status(200).json({ message: "Cliente excluido com sucesso!" });
  }
}

module.exports = { cadastrarClientes, findClienteByName, findClienteById, deleteClientById };
