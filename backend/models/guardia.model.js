const mongoose = require("mongoose");
const Usuario = require("./usuario.model");

const guardiaSchema = new mongoose.Schema({
    cargo: {
        type: String,
        required: true
    },
    situacion_laboral: {
        type: String,
        required: true
    }
});

const Guardia = Usuario.discriminator("Guardia", guardiaSchema);

module.exports = Guardia;