const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { userIdSchema } = require("../schema/usuario.schema");
const { tokenSchema } = require("../schema/acceso.schema");
const accesoService = require('../services/acceso.service');

/**
 * Crea un nuevo acceso
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function registrarIngreso(req, res) { //Solicitud emitida por el Usuario para Ingresar, Request.body=>id
  try {
    const { body } = req;
    const { error: bodyError } = userIdSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [token, tokenError] = await accesoService.registrarIngreso(req.body.id);
    if (tokenError) return respondError(req, res, 500, tokenError);
    if(!token) return respondError(req, res, 400, 'No se creó el token');
    respondSuccess(req, res, 201, token);
  } catch (error) {
    handleError(error, "acceso.controller -> registrarIngreso");
    respondError(req, res, 500, "No se registró el ingreso");
  }
}

/**
 * Valida un token de acceso
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function validarToken(req, res) { //Solicitud emitida por el guardia para Validar el Token, Request.body=>token, guardiaId
  try {
    const { body } = req;
    const { error: bodyError } = tokenSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [valido, tokenError] = await accesoService.validarToken(req.body.token, req.body.guardiaId);
    if (tokenError) return respondError(req, res, 500, tokenError);
    if(!valido) return respondError(req, res, 400, 'Token no válido');
    respondSuccess(req, res, 200, { success: true });
  } catch (error) {
    handleError(error, "acceso.controller -> validarToken");
    respondError(req, res, 500, "No se validó el token");
  }
}

/**
 * Crea un nuevo acceso
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function registrarSalida(req, res){ //Solicitud emitida por el Usuario para Salir, Request.body=>id
  try{
    const { body } = req;
    const { error: bodyError } = userIdSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [token, tokenError] = await accesoService.registrarSalida(req.body.id);
    if (tokenError) return respondError(req, res, 500, tokenError);
    if(!token) return respondError(req, res, 400, 'No se creó el token');
    respondSuccess(req, res, 201, token);
  }catch{
    handleError(error, "acceso.controller -> registrarSalida");
    respondError(req, res, 500, "No se registró la salida");
  }
}

module.exports = {
    registrarIngreso,
    validarToken,
    registrarSalida
};