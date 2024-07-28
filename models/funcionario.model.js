const mongoose = require("mongoose");
const Usuario = require("./user.models");

const funcionarioSchema = new mongoose.Schema({
    situacion: {
        type: String,
        required: true
    },
    departamento: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    jefatura: {
        type: String,
        required: true
    },
    anexo:{
        type: Number,
        required: true
    },
    oficina:{
        type: String,
        required: true
    }
});

const Funcionario = Usuario.discriminator("Funcionario", funcionarioSchema);

module.exports = Funcionario;