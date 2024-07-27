const mongoose = require("mongoose");

const accesoSchema = new mongoose.Schema({
    token: Number,
    expiryDate: Date,
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario' 
    },
    invitado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invitado'
    },
    guardia: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Guardia' 
    },
    jaula: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Jaula',
        default: null
    },
    entrada: { type: Date, default: null }, // Fecha y hora de entrada
    salida: { type: Date, default: null } // Fecha y hora de salida
});

const Acceso = mongoose.model("Acceso", accesoSchema);

module.exports = Acceso;