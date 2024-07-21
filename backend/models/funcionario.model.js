const mongoose = require("mongoose");
const Usuario = require("./usuario.model.js");

const funcionarioSchema = new mongoose.Schema({
    situacion: {
        type: String,
        required: true
    }
});

const Funcionario = Usuario.discriminator("Funcionario", funcionarioSchema);

module.exports = Funcionario;