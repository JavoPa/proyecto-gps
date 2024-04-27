const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

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
    situacion_academica: {
        type: String,
        required: true
    }
});

const Estudiante = Usuario.discriminator("Estudiante", estudianteSchema);

module.exports = Estudiante;