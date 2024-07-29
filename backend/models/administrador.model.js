const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const administradorSchema = new mongoose.Schema({
    situacion: {
        type: String
    }
});

const Administrador = Usuario.discriminator("Administrador", administradorSchema);

module.exports = Administrador;