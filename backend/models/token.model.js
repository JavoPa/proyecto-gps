// Model de Token Temporal, utilizado para el registro de salida de bicicletas 
const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const tokenSchema = new mongoose.Schema({
    rut: {
        type: String,
        ref: Usuario,
        required: true
    },
    token: {
        type: Number,
        required: true
    },
    duracion: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("TokenTemporal", tokenSchema);
