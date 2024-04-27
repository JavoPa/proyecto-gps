const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const academicoSchema = new mongoose.Schema({
    cargo: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    jefatura: {
        type: String,
        required: true
    },
    anexo: {
        type: Number,
        required: true
    },
    oficina: {
        type: String,
        required: true
    },
    situacion_laboral: {
        type: String,
        required: true
    }
});

const Academico = Usuario.discriminator("Academico", academicoSchema);

module.exports = Academico;