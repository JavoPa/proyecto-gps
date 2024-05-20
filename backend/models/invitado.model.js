const mongoose = require("mongoose");

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

const Invitado = mongoose.model("Invitado", invitadoSchema);

module.exports = Invitado;