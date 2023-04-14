const express = require ('express')
const app = express()
app.use(express.json())
const palavraChave = 'importante'
const funcoes = {
  ObservacaoCriada: (observacao) => {
    observacao.status = observacao.texto.includes(palavraChave) ? 'importante' : 'comum'
    const evento = {
      tipo: 'ObservacaoClassificada',
      dados: observacao
    }
    console.log(evento)
    axios.post('http://localhost:10000/eventos', evento)
  }
}
//POST /eventos
app.post('/eventos', (req, res) => {
  try{
    console.log(req.body)
    funcoes[req.body.tipo](req.body.dados)
  }
  catch(err){}
  res.status(200).send({msg: 'ok'})
})


app.listen(7000, () => console.log("Classificacao. Porta 7000."))