const Cidade = require("../database/Cidade");
const validarCidade = require("../services/cidadesService");

function cadastrarCliente(req, res) {
  const { id, nome, estado } = req.body;

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
  const erro = validarCidade(req, res, checks);
  if (erro) return erro;

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
}

module.exports = cadastrarCliente;