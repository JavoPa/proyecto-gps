const mongoose = require("mongoose");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
    rut: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: false
    },
    area: {
        type: String,
        required: false
    },
    situacion_laboral: {
        type: String,
        required: false
    },
    departamento: {
        type: String,
        required: false
    },
    carrera: {
        type: String,
        required: false
    },
    situacion_academica: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        required: true
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Roles",
        },
      ]
});

/** Encripta la contraseña del usuario */
usuarioSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
  
/** Compara la contraseña del usuario */
usuarioSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;