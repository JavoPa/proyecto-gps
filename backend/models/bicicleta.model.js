const mongoose = require("mongoose");

const bicicletaSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String
    },
    color: {
        type: String,
        required: true
    },
    tipo: {
        type: String
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String
    }
});

const Bicicleta = mongoose.model("Bicicleta", bicicletaSchema);

module.exports = Bicicleta;