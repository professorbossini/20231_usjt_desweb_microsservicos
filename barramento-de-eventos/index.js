const express = require('express')
const app = express()
app.use(express.json())
const axios = require ('axios')

const eventos = []

app.post('/eventos', async (req, res) => {
  const evento = req.body
  eventos.push(evento)
  console.log(evento)
  try{
    await axios.post('http://localhost:4000/eventos', evento)
  } catch(e){}
  try{
    await axios.post('http://localhost:5000/eventos', evento)
  }catch(e){}
  try{
    await axios.post('http://localhost:6000/eventos', evento)
  }catch(e){}
  try{
    await axios.post('http://localhost:7000/eventos', evento)
  }catch(e){}
  res.status(200).send({msg: 'ok'})
})

app.get('/eventos', (req, res) =>{
  res.send(eventos)
})

app.listen(10000, () => console.log("Barramento de eventos. Porta 10000"))