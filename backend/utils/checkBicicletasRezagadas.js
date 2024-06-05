//REVISAR COMO HACERLO FUNCIONAR
const cron = require('node-cron');
const Acceso = require("../models/acceso.model.js");
const Invitado = require("../models/invitado.model.js");
const Horas = require("../models/horas.model.js");
const Usuario = require("../models/usuario.model.js");

async function checkBicicletasRezagadas() {
    console.log("Revisando bicicletas rezagadas...");
    try {
        // Se buscan los registros de bicicletas que no han salido
        registros = await Acceso.find({ entrada: { $ne: null }, salida: null });
        for (registro of registros){
            // Se obtiene el usuario asociado al registro
            usuario = await Usuario.findById(registro.usuario);
            console.log("Usuario: ", usuario.nombre, " ", usuario.apellido, "RUT: ", usuario.rut, "Correo: ", usuario.correo);
            // console.log("Bicicleta rezagada: ", registro);
        }
    } catch (error) {
        console.log(error);
    }
}

async function initializeSchedule(horaLimite){
    let [hora, minutos] = horaLimite.split(":");
    let ahora = new Date();
    let horaActual = ahora.getHours();
    let minutosActuales = ahora.getMinutes();

    // Si la hora límite ya pasó, se revisan las bicicletas rezagadas
    if (horaActual > hora || (horaActual == hora && minutosActuales > minutos)){
        console.log("La hora límite ya pasó");
        checkBicicletasRezagadas();
    }

    // Expressión de cron para revisar las bicicletas rezagadas de lunes a viernes a la hora límite
    // formato:
    // ┌──────────── minutos (0 - 59)
    // │ ┌────────── hora (0 - 23)
    // │ │ ┌──────── dia del mes (1 - 31)
    // │ │ │ ┌────── mes (1 - 12 o nombres de los meses en inglés)
    // │ │ │ │ ┌──── dia de la semana (0 - 7 o nombres de los días de la semana en inglés)
    // │ │ │ │ │     (0 o 7 es Domingo)
    // │ │ │ │ │
    // * * * * *
    expresion= `${minutos} ${hora} * * 1-5`;

    // Se programa la revisión de bicicletas rezagadas de lunes a viernes a la hora límite
    cron.schedule(expresion, () => {
        checkBicicletasRezagadas();
    },
    {
        // Se ejecuta utilizando la zona horaria de Santiago
        scheduled: true,
        timezone: "America/Santiago"
    });
}

module.exports = initializeSchedule;