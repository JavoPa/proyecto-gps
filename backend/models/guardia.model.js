const mongoose = require("mongoose");

const guardiaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    situacion_laboral: {
        type: String,
        required: true
    }
});

const Guardia = mongoose.model("Guardia", guardiaSchema);

module.exports = Guardia;