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
    }
});

const Jaula = mongoose.model("Jaula", jaulaSchema);

module.exports = Jaula;