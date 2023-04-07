const express = require ('express')
const app = express()
app.use(express.json())

const baseConsulta = {}

const funcoes = {
  LembreteCriado: (lembrete) => {
    baseConsulta[lembrete.contador] = lembrete
  },
  ObservacaoCriada: (observacao) => {
    const observacoes = baseConsulta[observacao.lembreteId]['observacoes'] || []
    observacoes.push(observacao)
    baseConsulta[observacao.lembreteId]['observacoes'] = observacoes
  }
}

app.get('/lembretes', (req, res) => {
  res.status(200).send(baseConsulta)  
})

app.post('/eventos', (req, res) => {
  /*
    req.body = {
      tipo: ObservacaoCriada,
      dados: {
        id: 'fekwajçflewakjlj',
        texto: 'comprar açúcar',
        lembreteId: 1
      }
    }
  */
    funcoes[req.body.tipo](req.body.dados)
    res.status(200).send(baseConsulta)
})

app.listen(6000, () => console.log("Consulta. 6000"))