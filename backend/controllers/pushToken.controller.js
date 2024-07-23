const { respondSuccess, respondError } = require('../utils/resHandler');
const { handleError } = require('../utils/errorHandler');
const Usuario = require('../models/usuario.model');

/**
 * Actualiza el pushToken de un usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function actualizarPushToken(req, res) {
    const info = req.body;
    id = info.id;
    pT = info.pushToken;
    
    console.log("req: ", req.body);
    console.log("pushToken: ", pT);
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) return respondError(req, res, 400, 'Usuario no encontrado');
        await Usuario.findByIdAndUpdate(id, { pushToken: pT }, { new: true });
        respondSuccess(req, res, 200, 'PushToken actualizado');
    } catch (error) {
        handleError(error, "pushToken.controller -> actualizarPushToken");
        respondError(req, res, 500, "No se actualizó el pushToken");
    }
}

module.exports = {
    actualizarPushToken
};