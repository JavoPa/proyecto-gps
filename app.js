require('dotenv').config()

const {DATABASE_URL} = require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`${DATABASE_URL}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

