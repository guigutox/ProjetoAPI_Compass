const { isISO8601 } = require("validator");
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
        if (check.name === "data_nascimento"){
            //Verifica se está no padrão da ISO8601 yyyy-mm-dd e se não há numeros absurdos ex: 2020-13-33
            if(!isISO8601(check.value)) {
              return res.status(400).json({ error: `${check.name} deve ser uma data valida` });
            }
            const date = new Date();
            const data_nascimento = new Date(check.value);
            if(data_nascimento > date){
              return res.status(400).json({ error: `${check.name} deve ser menor que a data atual` });
            }
          
        } 
      }
}

function validarNome(checks, res) {

    for (let check of checks) {
          if(!check.value || check.value === null || check.value === undefined) {
            return res.status(400).json({ error: `${check.name} não foi informado` });
          }
          if(check.typeExpected === "string"){
            const hasNumber = /\d/.test(check.value);
            if(hasNumber) {
              return res.status(400).json({ error: `${check.name} não deve conter números` });
            }
          }
          if(check.typeExpected === "number"){
            if(check.value <= 0) {
              return res.status(400).json({ error: `${check.name} deve ser maior que zero` });
            }
            if(typeof check.value !== check.typeExpected) {
              return res.status(400).json({ error: `Tipo invalido, insira um numero` });
            }
          }
      
    }
}

module.exports = {validarCliente, validarNome};

