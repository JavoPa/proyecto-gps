const mongoose = require("mongoose");
const Usuario = require("./usuario.model");

const invitadoSchema = new mongoose.Schema({
    rut: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fono: {
        type: String
    },
    rol: {
        type: String,
        required: true
    }
});

const Invitado = Usuario.discriminator("Invitado", invitadoSchema);

module.exports = Invitado;