"use strict";
// Importa el modelo de datos 'usuario'
const Usuario = require("../models/usuario.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getUsers() {
    try {
        const usuarios = await Usuario.find();

        if (!usuarios) return [null, "No hay usuarios"];

        return [usuarios, null];
    } catch (error) {
        handleError(error, "usuario.service -> getUsuarios");
    }
}

module.exports = {
    getUsers
}