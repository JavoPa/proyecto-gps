require('dotenv').config()
const mongoose = require('mongoose'); 
const {
  DATABASE_URL,
  PORT,
} = require('dotenv').config()

const {poblarBD} = require('./config/poblar.bd.js')

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`${DATABASE_URL}`)

})

async function connectBaseDatos(){
  //conectar a base de datos
  await mongoose.connect('mongodb+srv://User:C2676@mi-bd.snhr7ql.mongodb.net/?retryWrites=true&w=majority');

}



app.listen(port, () => {
  console.log(`Servidor en ecucha en http://localhost:${PORT}`)
  //connectBaseDatos();
  console.log(DATABASE_URL);
  console.log(PORT);
  for (let i = 0; i < 10; i++){
    poblarBD();
  }
});

