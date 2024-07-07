// Configuración de horario para bicicletas rezagadas
const initializeSchedule = require('../utils/checkBicicletasRezagadas.js');
const Horas = require('../models/horas.model.js');
const handleError = require('../utils/errorHandler');

const scheduleConfig = async () => {
    try {
        const horario = await Horas.findOne();
        if(horario){
            initializeSchedule(horario.limiteSalida);
        } else {
            await new Horas({
                limiteEntrada: "08:00",
                limiteSalida: "20:00"
            }).save();
            const horario = await Horas.findOne();
            initializeSchedule(horario.limiteSalida);
        }
    } catch (error) {
        handleError(error, "schedule.config -> scheduleConfig");
    }
}

module.exports = scheduleConfig;