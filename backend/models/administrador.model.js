const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const administradorSchema = new mongoose.Schema({
    situacion: {
        type: String,
        required: true
    }
});

const Administrador = Usuario.discriminator("Administrador", administradorSchema);

module.exports = Administrador;