const mongoose = require("mongoose");

const incidenteSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    informante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
        required: true
    },
});

const Incidente = mongoose.model("Incidente", incidenteSchema);

module.exports = Incidente;