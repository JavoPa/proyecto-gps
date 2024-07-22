const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const estudianteSchema = new mongoose.Schema({
    carrera: {
        type: String,
        required: false
    },
    situacion: {
        type: String,
        required: true
    }
});

const Estudiante = Usuario.discriminator("Estudiante", estudianteSchema);

module.exports = Estudiante;