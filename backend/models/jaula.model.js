const mongoose = require("mongoose");

const jaulaSchema = new mongoose.Schema({
    ubicacion: {
        type: String,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    situacion_actual: {
        type: Number,
        required: true
    },
    identificador: {
        type: String,
        required: true,
        unique: true 
    },
    guardiaAsignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guardia',
        default: null
    }
});

const Jaula = mongoose.model("Jaula", jaulaSchema);

module.exports = Jaula;