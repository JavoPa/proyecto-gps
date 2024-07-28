const mongoose = require("mongoose");
const Usuario = require("./user.models");

const academicoSchema = new mongoose.Schema({
    situacion: {
        type: String,
        required: true
    }
});

const Academico = Usuario.discriminator("Academico", academicoSchema);

module.exports = Academico;