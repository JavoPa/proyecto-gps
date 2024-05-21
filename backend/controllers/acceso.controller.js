const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { userIdSchema } = require("../schema/usuario.schema");
const { tokenSchema, invitadoSchema } = require("../schema/acceso.schema");
const accesoService = require('../services/acceso.service');

/**
 * Crea un nuevo acceso
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function registrarIngreso(req, res) { //Solicitud emitida por el Usuario para Ingresar, Request.body=>id
  try {
    const userId = req.id;
    
    const { error: idError } = userIdSchema.validate({ id: userId });
    if (idError) return respondError(req, res, 400, idError.message);

    const [token, tokenError] = await accesoService.registrarIngreso(userId);
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
    const guardiaId = req.id;
    const { error: idError } = userIdSchema.validate({ id: guardiaId });
    if (idError) return respondError(req, res, 400, idError.message);
    const [valido, tokenError] = await accesoService.validarToken(req.body.token, guardiaId);
    if (tokenError) return respondError(req, res, 500, tokenError);
    if(!valido) return respondError(req, res, 400, 'Token no válido');
    respondSuccess(req, res, 200, { success: true });
  } catch (error) {
    handleError(error, "acceso.controller -> validarToken");
    respondError(req, res, 500, "No se validó el token");
  }
}

/**
 * Crea un nuevo acceso manual por el guardia
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function ingresoInvitado(req, res) { //Solicitud emitida por el Guardia
  try {
    const guardiaId = req.id;
    const { error: idError } = userIdSchema.validate({ id: guardiaId });
    if (idError) return respondError(req, res, 400, idError.message);
    const { body } = req;
    const { error: bodyError } = invitadoSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [ingreso, ingresoError] = await accesoService.ingresoInvitado(body, guardiaId);
    if (ingresoError) return respondError(req, res, 500, ingresoError);
    if(!ingreso) return respondError(req, res, 400, 'No se registró el ingreso');
    respondSuccess(req, res, 201, ingreso);
  } catch (error) {
    handleError(error, "acceso.controller -> ingresoInvitado");
    respondError(req, res, 500, "No se registró el ingreso");
  }
}

module.exports = {
    registrarIngreso,
    validarToken,
    ingresoInvitado,
};