//Valida os valores passados e devolve o erro se houver
function validarCidade(res, checks) {
  for (let check of checks) {
    if (!check.value || check.value === null || check.value === undefined) {
      return res.status(400).json({ error: `${check.name} não foi informado` });
    }
    if (typeof check.value !== check.typeExpected) {
      return res.status(400).json({ error: `${check.errorMessage}` });
    }
    if (check.typeExpected === "number" && check.value <= 0)
      return res
        .status(400)
        .json({ error: `{${check.name}} deve ser maior que zero}` });
  }
  return null;
}

function validarNome(name, res) {
  const hasNumber = /\d/.test(name);

  if (!name || name === null || name === undefined) {
    return res.status(400).json({ error: "Nome da cidade não foi informado" });
  }
  if (hasNumber) {
    return res
      .status(400)
      .json({ error: "Nome da cidade deve ser uma string" });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ error: "Nome da cidade deve ter pelo menos 3 caracteres" });
  }

  return null;
}

module.exports = {validarCidade, validarNome};
