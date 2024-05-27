//Valida os valores passados e devolve o erro se houver
function validarCliente(res, checks) {
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
}

module.exports = validarCliente;