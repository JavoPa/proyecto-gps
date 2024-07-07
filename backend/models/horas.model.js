const mongoose = require("mongoose");

const horaSchema = new mongoose.Schema({
    limiteEntrada: {
        type: String,
        required: true,
    },
    limiteSalida: {
        type: String,
        required: true,
    }
});

const Horas = mongoose.model("Horas", horaSchema);

module.exports = Horas;