const mongoose = require("mongoose");
const Usuario = require("./usuario.model");

const invitadoSchema = new mongoose.Schema({

});

const Invitado = Usuario.discriminator("Invitado", invitadoSchema);

module.exports = Invitado;