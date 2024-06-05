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
    },
    horaLimiteIngreso:{
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/ // formato hora HH:MM, ej: 20:30
    },
    horaLimiteSalida:{
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/ // formato hora HH:MM, ej: 20:30
    }
});

const Jaula = mongoose.model("Jaula", jaulaSchema);

module.exports = Jaula;