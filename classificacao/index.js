const express = require('express');
const axios = require('axios');
const app = express()
app.use(express.json())
const palavraChave = 'importante'
const funcoes = {
  ObservacaoCriada: (observacao) => {
    observacao.status = observacao.texto.includes(palavraChave) ? 'importante' : 'comum';
    axios.post("http://localhost:10000/eventos", {
      tipo: "ObservacaoClassificada",
      dados: observacao
    });
  }
}
//POST /eventos
app.post('/eventos', (req, res) => {
  try {
    console.log(`---------->Recebi: ${req.body.tipo}`);
    funcoes[req.body.tipo](req.body.dados);
  } catch (err) { 
    console.log(`!!!!!!!!!!!!Deu erro: ${err}`);
  }
  res.status(200).send({ msg: 'ok' })
})

app.listen(7000, () => console.log("Classificacao. Porta 7000."))