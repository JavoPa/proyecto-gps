const mongoose = require("mongoose");
const Usuario = require("./user.models");

const estudianteSchema = new mongoose.Schema({
    carrera: {
        type: String,
        required: true
    },
    Facultad: {
        type: String,
        required: true
    },
    Fecha_ingreso: {
        type: String,
        required: true
    },
    situacion: {
        type: String,
        required: true
    }
});

const Estudiante = Usuario.discriminator("Estudiante", estudianteSchema);

module.exports = Estudiante;