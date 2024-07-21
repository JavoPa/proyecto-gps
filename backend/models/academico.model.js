const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const academicoSchema = new mongoose.Schema({
    situacion: {
        type: String,
        required: true
    }
});

const Academico = Usuario.discriminator("Academico", academicoSchema);

module.exports = Academico;