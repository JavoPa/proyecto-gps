const mongoose = require("mongoose");

const accesoSchema = new mongoose.Schema({
    token: Number,
    expiryDate: Date,
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario' 
    },
    guardia: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Guardia' 
    },
    entrada: Date, // Fecha y hora de entrada
    salida: Date // Fecha y hora de salida
});

const Acceso = mongoose.model("Acceso", accesoSchema);

module.exports = Acceso;