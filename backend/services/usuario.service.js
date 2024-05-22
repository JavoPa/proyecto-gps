"use strict";
const { handleError } = require("../utils/errorHandler");
const Bicicleta = require("../models/bicicleta.model.js");
const Usuario = require("../models/usuario.model.js");

/**
 * Obtiene los detalles del usuario por id
 * @param {string} id Id de usuario
 * @returns {Promise} Promesa con el usuario encontrado
 */
async function getUserById(id) {
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findById(id).select('-password').populate('bicicleta');
        if (!usuario) {
            return [null, 'Usuario no encontrado'];
        }
        return [usuario, null];
    }
    catch (error) {
        handleError(error, "usuario.service -> getUserById");
        return [null, error];
    }
}


module.exports = {
    getUserById
};