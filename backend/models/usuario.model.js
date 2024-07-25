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
    fono: {
        type: String
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    bicicleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bicicleta'
    },
    pushToken: {
        type: String,
        default: ""
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