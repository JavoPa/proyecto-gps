//REVISAR COMO HACERLO FUNCIONAR
const cron = require('node-cron');
const Acceso = require("../models/acceso.model.js");
const Invitado = require("../models/invitado.model.js");
const Horas = require("../models/horas.model.js");
const Usuario = require("../models/usuario.model.js");

async function checkBicicletasRezagadas(hora, minutos) {
    try {
        registros = await Acceso.find({ entrada: { $ne: null }, salida: null });
        console.log("Registros: ", registros);
        for (registro of registros){
            console.log("Bicicleta rezagada: ", registro);
        }
    } catch (error) {
        console.log(error);
    }
}

async function inicializar(){
    console.log("Inicializando tarea programada...");
    horario = await Horas.findOne({});
    console.log("Horario: ", horario);
    horaLimite = horario.limiteSalida;
    let [hora, minutos] = horaLimite.split(":");
    expresion= `${minutos} ${hora} * * 1-5`;

    cron.schedule(expresion, () => {
        console.log("Revisando bicicletas rezagadas...")
        checkBicicletasRezagadas(hora, minutos);
    },
    {
        scheduled: true,
        timezone: "America/Santiago"
    });
}

module.exports = inicializar;