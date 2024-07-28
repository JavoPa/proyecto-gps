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

    const [bicicleta, bicicletaError] = await bicicletaService.createBicicleta(body, userId);
    if (bicicletaError) return respondError(req, res, 400, bicicletaError);
    if(!bicicleta) return respondError(req, res, 400, 'No se creó la bicicleta');
    respondSuccess(req, res, 201, bicicleta);
  } catch (error) {
    handleError(error, "bicicleta.controller -> createBicicleta");
    respondError(req, res, 500, "No se creó la bicicleta");
  }
}

/**
 * Crea una bicicleta para un usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateBicicletaUsuario(req, res) { //Solicitud emitida por el Usuario para Crear Bicicleta, Request.body=>id
  try {
    const { id } = req.params;
    const { error: idError } = userIdSchema.validate({ id });
    if (idError) return respondError(req, res, 400, idError.message);

    const { body } = req;
    const { error: bodyError } = bicicletaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [bicicleta, bicicletaError] = await bicicletaService.updateBicicletaUsuario(body, id);
    if (bicicletaError) return respondError(req, res, 500, bicicletaError);
    if(!bicicleta) return respondError(req, res, 400, 'No se registró la bicicleta');
    respondSuccess(req, res, 200, bicicleta);
  } catch (error) {
    handleError(error, "bicicleta.controller -> updateBicicletaUsuario");
    respondError(req, res, 500, "No se registró la bicicleta");
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

    const [bicicleta, bicicletaError] = await bicicletaService.updateBicicleta(body, userId);
    if (bicicletaError) return respondError(req, res, 500, bicicletaError);
    if(!bicicleta) return respondError(req, res, 400, 'No se modificó la bicicleta');
    respondSuccess(req, res, 200, bicicleta);
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
    
        const [bicicleta, bicicletaError] = await bicicletaService.getBicicleta(userId);
        if (bicicletaError) return respondError(req, res, 500, bicicletaError);
        if(!bicicleta) return respondError(req, res, 404, 'No tienes datos de tu bicicleta registrados');
        respondSuccess(req, res, 200, bicicleta);
    } catch (error) {
        handleError(error, "bicicleta.controller -> viewBicicleta");
        respondError(req, res, 500, "No se pudo obtener la bicicleta");
    }
}

/**
 * Obtener bicicleta por id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getBicicletaById(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = userIdSchema.validate({ id });
        if (idError) return respondError(req, res, 400, idError.message);
    
        const [bicicleta, bicicletaError] = await bicicletaService.getBicicletaById(id);
        if (bicicletaError) return respondError(req, res, 500, bicicletaError);
        if(!bicicleta) return respondError(req, res, 400, 'No se creó el bicicleta');
        respondSuccess(req, res, 201, bicicleta);
    } catch (error) {
        handleError(error, "bicicleta.controller -> getBicicletaById");
        respondError(req, res, 500, "No se pudo obtener la bicicleta");
    }
}
module.exports = {
    createBicicleta,
    updateBicicleta,
    getBicicleta,
    getBicicletaById,
    updateBicicletaUsuario
    };