const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const funcionarioSchema = new mongoose.Schema({
    situacion_laboral: {
        type: String,
        required: true
    },
    departamento: {
        type: String,
        required: false
    },
    cargo: {
        type: String,
        required: false
    }
});

const Funcionario = Usuario.discriminator("Funcionario", funcionarioSchema);

module.exports = Funcionario;