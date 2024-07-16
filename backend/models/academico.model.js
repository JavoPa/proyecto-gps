const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const academicoSchema = new mongoose.Schema({
    cargo: {
        type: String,
        required: false
    },
    area: {
        type: String,
        required: false
    },
    situacion_laboral: {
        type: String,
        required: true
    }
});

const Academico = Usuario.discriminator("Academico", academicoSchema);

module.exports = Academico;