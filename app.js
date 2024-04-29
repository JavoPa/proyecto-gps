require('dotenv').config()
const {poblarBD} = require('./config/poblar.bd.js')
const express = require('express')
const {PORT, DB_URL} = process.env
const indexRouter = require('./router/index.router.js')


async function servidorGeneral(){
  try {
    const app = express()
    app.use(express.json())
    app.use("/v1.1",indexRouter);
    app.listen(PORT, () => {
      console.log(`Servidor en ecucha en http://localhost:${PORT}`)
    });
  } catch (error) {
    console.log(error);
  }
}

async function connectBaseDatos(){
  //conectar a base de datos
  try {
    await mongoose.connect(DB_URL);
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos');
    console.error(error);
  }

}

async function backendInicio(){
  try {
    // conexion bd
    await connectBaseDatos();
    // poblar Bd
    await poblarBD(10);
    //iniciar servidor
    await servidorGeneral();
  } catch (error) {
    console.log(error);
  }
}


