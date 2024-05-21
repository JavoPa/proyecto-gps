const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { userIdSchema } = require("../schema/usuario.schema");
const { bicicletaSchema } = require("../schema/bicicleta.schema");
const bicicletaService = require('../services/bicicleta.service');

/**
 * Crea una bicicleta
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createBicicleta(req, res) { //Solicitud emitida por el Usuario para Crear Bicicleta, Request.body=>id
  try {
    const userId = req.id;
    
    const { error: idError } = userIdSchema.validate({ id: userId });
    if (idError) return respondError(req, res, 400, idError.message);

    const { body } = req;
    const { error: bodyError } = bicicletaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [token, tokenError] = await bicicletaService.createBicicleta(body, userId);
    if (tokenError) return respondError(req, res, 500, tokenError);
    if(!token) return respondError(req, res, 400, 'No se creó el token');
    respondSuccess(req, res, 201, token);
  } catch (error) {
    handleError(error, "bicicleta.controller -> createBicicleta");
    respondError(req, res, 500, "No se creó la bicicleta");
  }
}

/**
 * Modifica una bicicleta
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateBicicleta(req, res) { //Solicitud emitida por el Usuario para Modificar Bicicleta, Request.body=>id
  try {
    const userId = req.id;
    
    const { error: idError } = userIdSchema.validate({ id: userId });
    if (idError) return respondError(req, res, 400, idError.message);

    const { body } = req;
    const { error: bodyError } = bicicletaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [token, tokenError] = await bicicletaService.updateBicicleta(body, userId);
    if (tokenError) return respondError(req, res, 500, tokenError);
    if(!token) return respondError(req, res, 400, 'No se creó el token');
    respondSuccess(req, res, 201, token);
  } catch (error) {
    handleError(error, "bicicleta.controller -> updateBicicleta");
    respondError(req, res, 500, "No se modificó la bicicleta");
  }
}

/**
 * Ver bicicleta
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getBicicleta(req, res) { //Solicitud emitida por el Usuario para Ver Bicicleta, Request.body=>id
    try {
        const userId = req.id;
        
        const { error: idError } = userIdSchema.validate({ id: userId });
        if (idError) return respondError(req, res, 400, idError.message);
    
        const [token, tokenError] = await bicicletaService.getBicicleta(userId);
        if (tokenError) return respondError(req, res, 500, tokenError);
        if(!token) return respondError(req, res, 400, 'No se creó el token');
        respondSuccess(req, res, 201, token);
    } catch (error) {
        handleError(error, "bicicleta.controller -> viewBicicleta");
        respondError(req, res, 500, "No se pudo obtener la bicicleta");
    }
    }

module.exports = {
    createBicicleta,
    updateBicicleta,
    getBicicleta
    };