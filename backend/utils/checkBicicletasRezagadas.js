//REVISAR COMO HACERLO FUNCIONAR
const cron = require('node-cron');
const Acceso = require("../models/acceso.model.js");
const Invitado = require("../models/invitado.model.js");
const Horas = require("../models/horas.model.js");
const Usuario = require("../models/usuario.model.js");

async function checkBicicletasRezagadas(hora, minutos) {
    try {
        ahora = new Date();
        limiteSalida = new Date(ahora.setHours(hora, minutos, 0, 0));
        registros = await Acceso.find({ entrada: { $ne: null }, salida: null });
        for (registro of registros){
            if (ahora > limiteSalida){
                console.log("Bicicleta rezagada: ", registro);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

horario = await Horas.find({}).limit(1)
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

task.start();