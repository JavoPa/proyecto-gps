"use strict";
const { handleError } = require("../utils/errorHandler");
const Horas = require("../models/horas.model.js");
const initializeSchedule = require("../utils/checkBicicletasRezagadas.js");
/**
 * Crea un nuevo horario en la base de datos.
 * @param {Object} body Objeto con los datos del horario
 * @returns {Promise} Promesa con el objeto de horario creado
 */
async function createHorario(body) {
    try {
      const horario = new Horas({
        ...body
      });
      await horario.save();
      initializeSchedule(horario.limiteSalida);
      return [horario, null];
    } catch (error) {
      handleError(error, "horas.service -> createHorario");
      return [null, error];
    }
  }

/**
 * Obtiene todos los horarios de la base de datos.
 * @returns {Promise} Promesa con los horarios
 */
async function getHorarios() {
    try {
        const horarios = await Horas.find();
        return [horarios, null];
    } catch (error) {
        handleError(error, "horas.service -> getHorarios");
        return [null, error];
    }
}

/**
 * Actualiza un horario en la base de datos.
 * @param {Object} body - Datos del horario
 */
async function updateHorario(body) {
    try {
      const horarioId = await Horas.find({}).select('_id');
      
      if (horarioId.length === 0) {
        throw new Error('No se encontró ningún horario');
      }
  
      const horario = await Horas.findByIdAndUpdate(horarioId[0]._id, body, { new: true });
  
      if (!horario) {
        throw new Error('No se actualizó el horario');
      }
  
      initializeSchedule(horario.limiteSalida);
      return [horario, null];
    } catch (error) {
      handleError(error, "horas.service -> updateHorario");
      return [null, error];
    }
  }

// /**
//  * Elimina un horario en la base de datos.
//  */
// async function deleteHorario(horarioId) {
//     try {
//         await Horas.findByIdAndDelete(horarioId);
//         return [null, null];
//     } catch (error) {
//         handleError(error, "horas.service -> deleteHorario");
//         return [null, error];
//     }
// }

module.exports = { createHorario, getHorarios, updateHorario };