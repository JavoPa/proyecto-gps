"use strict";
const { handleError } = require("../utils/errorHandler");
const Bicicleta = require("../models/bicicleta.model.js");
const Usuario = require("../models/usuario.model.js");

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
    getUsers,
    getUserById
};