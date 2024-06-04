const Cidade = require("../database/Cidade");
const {validarCidade, validarNome} = require("../services/CidadeService");

function cadastrarCidade(req, res) {
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
  const erro = validarCidade(res, checks);
  if (erro) return erro;

  Cidade.create({
    id: id,
    nome: nome,
    estado: estado,
  })
    .then(() => {
      res.status(201).json({ message: "Cidade criada com sucesso!" });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Id da cidade já existe" });
      } else {
        return res.status(500).json({ error: "Erro interno no servidor" });
      }
    });
}

async function findCidadeByName(req, res) {
  let { nome } = req.params;

  const checks =[
    {
      name: "cidade",
      value: nome,
      }
  ]


  const erro = validarNome(checks, res);
  if(erro) return erro;

  const cidade = await Cidade.findOne({ where: { nome: nome } });

  if (!cidade) {
    return res.status(404).json({ error: "Cidade não encontrada" });
  } else {
    return res.status(200).json(cidade);
  }
}

async function findCidadebyEstado(req, res) {
  let { estado } = req.params;

  check = [
    {
      name: "estado",
      value: estado,
    },
  ];

  const erro = validarNome(check, res);
  if (erro) return erro;

  const estadofinded = await Cidade.findAll({ where: { estado: estado } });

  if (!estadofinded || estadofinded.length === 0) {
    return res.status(404).json({ error: "Estado não encontrado ou nenhuma cidade cadastrada para este estado" });
  } else {
    return res.status(200).json(estadofinded);
  }
}


module.exports = { cadastrarCidade, findCidadeByName, findCidadebyEstado };
