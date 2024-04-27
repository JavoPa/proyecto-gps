const mongoose = require("mongoose");
const Usuario = require("./user.models");

const administradorSchema = new mongoose.Schema({
    cargo: {
        type: String,
        required: true
    },
    departamento: {
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
    }
});

const Administrador = Usuario.discriminator("Administrador", administradorSchema);

module.exports = Administrador;