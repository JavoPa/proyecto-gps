"use strict";
const { handleError } = require("../utils/errorHandler");
const Bicicleta = require("../models/bicicleta.model.js");
const Usuario = require("../models/usuario.model.js");

/**
 * Crea una nueva bicicleta en la base de datos.
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createBicicleta(body, usuarioId) {
    try {
      // Verificar si el estudiante tiene una bici registrada
      const usuario = await Usuario.findById(usuarioId).populate('bicicleta');
      if (!usuario) {
        return [null, 'Usuario no encontrado'];
      }
      if (usuario.bicicleta) {
        return [null, 'El usuario ya tiene una bicicleta registrada'];
      }
      const bicicleta = new Bicicleta({
        ...body
      });
      await bicicleta.save();
      // Asignar la bicicleta al usuario
      usuario.bicicleta = bicicleta._id;
      await usuario.save();
    
      // Devolver la bicicleta
      return [bicicleta, null];
    } catch (error) {
      handleError(error, "acceso.service -> registrarIngreso");
      return [null, error];
    }
  }
/**
 * Modifica una bicicleta en la base de datos
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function updateBicicleta(body, usuarioId) {
    try {
      // Verificar si el estudiante tiene una bici registrada
      const usuario = await Usuario.findById(usuarioId).populate('bicicleta');
        if (!usuario) {
            return [null, 'Usuario no encontrado'];
        }
        if (!usuario.bicicleta) {
            return [null, 'El usuario no tiene una bicicleta registrada'];
        }
        // Modificar la bicicleta
        const bicicleta = await Bicicleta.findByIdAndUpdate(usuario.bicicleta._id, body, { new: true });
        return [bicicleta, null];
    }
    catch (error) {
        handleError(error, "acceso.service -> registrarIngreso");
        return [null, error];
    }
}
/**
 * Crea o actualiza la bicicleta de un usuario
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function updateBicicletaUsuario(body, usuarioId) {
  try {
    // Verificar si el estudiante tiene una bici registrada
    const usuario = await Usuario.findById(usuarioId).populate('bicicleta');
    if (!usuario) {
      return [null, 'Usuario no encontrado'];
    }
    if (usuario.bicicleta) {
      // Modificar la bicicleta
      const bicicleta = await Bicicleta.findByIdAndUpdate(usuario.bicicleta._id, body, { new: true });
      return [bicicleta, null];
    }
    const bicicleta = new Bicicleta({
      ...body
    });
    await bicicleta.save();
    // Asignar la bicicleta al usuario
    usuario.bicicleta = bicicleta._id;
    await usuario.save();
  
    // Devolver la bicicleta
    return [bicicleta, null];
  } catch (error) {
    handleError(error, "acceso.service -> registrarIngreso");
    return [null, error];
  }
}
/**
 * Obtiene la bicicleta de un usuario
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function getBicicleta(usuarioId) {
    try {
        // Verificar si el estudiante tiene una bici registrada
        const usuario = await Usuario.findById(usuarioId).populate('bicicleta');
        if (!usuario) {
            return [null, 'Usuario no encontrado'];
        }
        // if (!usuario.bicicleta) {
        //     return [null, 'No tienes bicicleta registrada'];
        // }
        return [usuario.bicicleta, null];
    }
    catch (error) {
        handleError(error, "acceso.service -> registrarIngreso");
        return [null, error];
    }
}
/**
 * Obtiene la bicicleta por id
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function getBicicletaById(bicicletaId) {
    try {
        // Verificar si la bici existe
        const bicicleta = await Bicicleta.findById(bicicletaId);
        if (!bicicleta) {
            return [null, 'Bicicleta no encontrada'];
        }
        return [bicicleta, null];
    }
    catch (error) {
        handleError(error, "acceso.service -> registrarIngreso");
        return [null, error];
    }
}


module.exports = {
    createBicicleta,
    updateBicicleta,
    getBicicleta,
    getBicicletaById,
    updateBicicletaUsuario
    };