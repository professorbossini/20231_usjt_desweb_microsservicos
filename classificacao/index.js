const express = require ('express')
const axios = require('axios')
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
    .then(res => console.log('then'))
    .catch(e => console.log(e))
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


app.listen(7000, async () => {
  console.log("Classificacao. Porta 7000.")
  try{
    const eventos = await axios.get('http://localhost:10000/eventos')
    console.log(eventos.data)
    eventos.data.forEach((evento) => {
      try{
        console.log(evento)
        funcoes[evento.tipo](evento.dados)
      }
      catch (e){}
    })
  }
  catch (e){
    console.log(e)
  }
})