"use strict";
const { handleError } = require("../utils/errorHandler");
const Acceso = require("../models/acceso.model.js");

/**
 * Crea un nuevo token de acceso en la base de datos para un usuario.
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
const generarToken = async (usuarioId) => {
  try {
    let token;
    let tokenEnUso = true;
    //Genera un token asegurandose que encuentre uno que no esté en uso
    while (tokenEnUso) {
      token = Math.floor(1000 + Math.random() * 9000);
      const accesoExistente = await Acceso.findOne({ token, expiryDate: { $gt: new Date() } });
      if (!accesoExistente) {
        tokenEnUso = false;
      }
    }
  
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 5); // El token expira en 5 minutos
  
    const acceso = new Acceso({
      token,
      expiryDate,
      usuario: usuarioId,
      entrada: null,
      salida: null
    });
  
    await acceso.save();
  
    return acceso;
  } catch (error) {
    handleError(error, "acceso.service -> generarToken");
    throw error;
  }
  };

/**
 * Crea un nuevo acceso en la base de datos.
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function registrarIngreso(usuarioId) {
  try {
    // Verificar si el estudiante ya tiene un acceso sin fecha de salida
    const accesoExistente = await Acceso.findOne({ usuario: usuarioId, salida: null });
    if (accesoExistente) {
      return [null, 'El usuario ya tiene un acceso sin fecha de salida'];
    }
  
    // Generar un nuevo token y lo guarda en la base de datos
    const acceso = await generarToken(usuarioId);
  
    // Devolver el token
    return [acceso, null];
  } catch (error) {
    handleError(error, "acceso.service -> registrarIngreso");
    return [null, error];
  }
}
/**
 * Valida el token de acceso proporcionado guardando la fecha de entrada o salida.
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function validarToken(token, guardiaId) {
  try {
    // Buscar el acceso con el token proporcionado
    const acceso = await Acceso.findOne({ token });
  
    // Verificar que el acceso existe y no tiene una fecha de salida
    if (!acceso || acceso.expiryDate < new Date()) {
      return [null, 'Token inválido o expirado']
    }
    // Establecer la fecha de ingreso y el ID del guardia
    if(acceso.salida) {
      return [null, 'El token ya fue usado'];
    }
    if(acceso.entrada){
      acceso.salida = new Date();
    }else{
      acceso.entrada = new Date();
    }
    acceso.expiryDate = new Date(); // Establece la fecha de expiración a la fecha y hora actual
    acceso.guardia = guardiaId;
  
    // Guardar el acceso
    await acceso.save();
    return [acceso, null];
  } catch (error) {
    handleError(error, "user.service -> validarToken");
    return [null, error];
  }
}

  module.exports = {
    registrarIngreso,
    validarToken
};