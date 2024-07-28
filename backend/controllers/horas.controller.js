const { respondSuccess, respondError } = require('../utils/resHandler');
const { handleError } = require('../utils/errorHandler');
const horasService = require('../services/horas.service');
const { horaSchema } = require('../schema/horas.schema');

/**
 * Crea un horario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createHorario(req, res) {
  try {
    const { body } = req;

    // Validar el cuerpo de la solicitud
    const { error } = horaSchema.validate(body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }

    const [horario, serviceError] = await horasService.createHorario(body);
    if (serviceError) return respondError(req, res, 500, serviceError);
    if (!horario) return respondError(req, res, 400, 'No se creó el horario');
    respondSuccess(req, res, 201, horario);
  } catch (error) {
    handleError(error, "horas.controller -> createHorario");
    respondError(req, res, 500, "No se creó el horario");
  }
}

/**
 * Obtiene todos los horarios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getHorarios(req, res) {
  try {
    const [horarios, error] = await horasService.getHorarios();
    if (error) return respondError(req, res, 500, error);
    if (!horarios) return respondError(req, res, 400, 'No se encontraron horarios');
    respondSuccess(req, res, 200, horarios);
  } catch (error) {
    handleError(error, "horas.controller -> getHorarios");
    respondError(req, res, 500, "No se encontraron horarios");
  }
}

/**
 * Actualiza un horario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateHorario(req, res) {
  try {
    // const { id } = req.params;
    const { body } = req;
    // Validar el cuerpo de la solicitud
    const { error } = horaSchema.validate(body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }
    const [horario, serviceError] = await horasService.updateHorario(body);
    if (serviceError) return respondError(req, res, 500, error);
    if (!horario) return respondError(req, res, 400, 'No se actualizó el horario');
    respondSuccess(req, res, 200, horario);
  } catch (error) {
    handleError(error, "horas.controller -> updateHorario");
    respondError(req, res, 500, "No se actualizó el horario");
  }
}

// /**
//  * Elimina un horario
//  * @param {Object} req - Objeto de petición
//  * @param {Object} res - Objeto de respuesta
//  */
// async function deleteHorario(req, res) {
//   try {
//     const { id } = req.params;
//     const [horario, error] = await horasService.deleteHorario(id);
//     if (error) return respondError(req, res, 500, error);
//     if (!horario) return respondError(req, res, 400, 'No se eliminó el horario');
//     respondSuccess(req, res, 200, 'Horario eliminado');
//   } catch (error) {
//     handleError(error, "horas.controller -> deleteHorario");
//     respondError(req, res, 500, "No se eliminó el horario");
//   }
// }

module.exports = {
    createHorario,
    getHorarios,
    updateHorario,
    // deleteHorario
    };