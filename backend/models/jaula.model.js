const mongoose = require("mongoose");

const jaulaSchema = new mongoose.Schema({
    ubicacion: {
        type: String,
        required: true,
        unique: true
    },
    capacidad: {
        type: Number,
        required: true,
        min: 1,
        max: 200
    },
    identificador: {
        type: String,
        required: true,
        unique: true,
        maxlength: 200
    },
    guardiaAsignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guardia',
        default: null
    }
});

const Jaula = mongoose.model("Jaula", jaulaSchema);

module.exports = Jaula;
