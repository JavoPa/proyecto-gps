const mongoose = require("mongoose");

const bicicletaSchema = new mongoose.Schema({
    color: {
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
    estado: {
        type: String,
        required: true
    }
});

const Bicicleta = mongoose.model("Bicicleta", bicicletaSchema);

module.exports = Bicicleta;