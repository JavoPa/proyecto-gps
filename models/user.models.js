const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    fecha_nacimiento: {
        type: String,
        required: true
    },
    Direccion: {
        type: String,
        required: true
    },
    fono: {
        type: Number,
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
    Genero:{
        type: String,
        required: true
    },
    Rol:{
        type: String,
        required: true
    }
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