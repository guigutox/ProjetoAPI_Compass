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

function validarNome(checks, res) {

  for (let check of checks) {
    //Expressão regular para verificar se o valor contém pelo menos um número
    const hasNumber = /\d/.test(check.value);

    //verifica os valores e retorna o erro se houver
    if (!check.value || check.value === null || check.value === undefined) {
      return res.status(400).json({ error: `${check.name} não foi informado` });
    }
    //Verifica a resposta retornada se há numeros no campo passado
    if (hasNumber) {
      return res
        .status(400)
        .json({ error: `${check.name} não deve conter números` });
    }
    //Delimita o tamanho do campo para ser maior que 3
    if (check.name === "nome" && check.value.length < 3) {
      return res
        .status(400)
        .json({ error: "Nome da cidade deve ter pelo menos 3 caracteres" });
    }
    //Delimita o tamanho do campo para ser maior que 2
    if (check.name === "estado" && check.value.length < 2) {
      return res
        .status(400)
        .json({ error: "Nome do estado deve ter pelo menos 2 caracteres" });
    }
  }
  return null;
}

module.exports = { validarCidade, validarNome };
