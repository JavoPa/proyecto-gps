const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { userIdSchema } = require("../schema/usuario.schema");
const {guardiaIdSchema} = require("../schema/guardia.schema");
const { tokenSchema, invitadoSchema } = require("../schema/acceso.schema");
const accesoService = require('../services/acceso.service');
const Acceso = require('../models/acceso.model');
const Jaula = require('../models/jaula.model');
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
    if (tokenError) return respondError(req, res, 400, tokenError);
    if(!token) return respondError(req, res, 400, 'No se creó el token');
    respondSuccess(req, res, 201, token);
  } catch (error) {
    handleError(error, "acceso.controller -> registrarIngreso");
    respondError(req, res, 500, "No se registró el ingreso");
  }
}

/**
 * Registra la salida del usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function registrarSalida(req, res) { //Solicitud emitida por el Usuario para Salir, Request.body=>id
  try {
    const userId = req.id;
    
    const { error: idError } = userIdSchema.validate({ id: userId });
    if (idError) return respondError(req, res, 400, idError.message);

    const [token, tokenError] = await accesoService.registrarSalida(userId);
    if (tokenError) return respondError(req, res, 500, tokenError);
    if(!token) return respondError(req, res, 400, 'No se creó el token');
    respondSuccess(req, res, 201, token);
  } catch (error) {
    handleError(error, "acceso.controller -> registrarSalida");
    respondError(req, res, 500, "No se registró la salida");
  }
}

/**
 * Valida un token de acceso
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function validarToken(req, res) { //Solicitud emitida por el guardia para Validar el Token, Request.body=>token, guardiaId
  try {
    const { token }= req.params;
    const { error: bodyError } = tokenSchema.validate({token});
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const guardiaId = req.id;
    const { error: idError } = userIdSchema.validate({ id: guardiaId });
    if (idError) return respondError(req, res, 400, idError.message);
    const [valido, tokenError] = await accesoService.validarToken(token, guardiaId);
    if (tokenError) return respondError(req, res, 400, tokenError);
    if(!valido) return respondError(req, res, 400, 'Token no válido');
    respondSuccess(req, res, 200, valido);
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
    if (ingresoError) return respondError(req, res, 400, ingresoError);
    if(!ingreso) return respondError(req, res, 400, 'No se registró el ingreso');
    respondSuccess(req, res, 201, ingreso);
  } catch (error) {
    handleError(error, "acceso.controller -> ingresoInvitado");
    respondError(req, res, 500, "No se registró el ingreso");
  }
}



/**
 * Registra el ingreso del guardia y lo asigna a una jaula específica.
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function ingresoGuardia(req, res) {
    try {
        const guardiaId = req.id;
        const { jaulaId } = req.body;

        if (!jaulaId) return respondError(req, res, 400, 'El ID de la jaula es requerido');

        const jaula = await Jaula.findById(jaulaId);
        if (!jaula) return respondError(req, res, 404, 'Jaula no encontrada');

        const jaulaConGuardia = await Jaula.findOne({ guardiaAsignado: guardiaId });
        if (jaulaConGuardia) return respondError(req, res, 400, 'El guardia ya está asignado a otra jaula');

        jaula.guardiaAsignado = guardiaId;
        await jaula.save();

        const nuevoAcceso = new Acceso({
            usuario: guardiaId,
            entrada: new Date(),
            salida: null
        });

        const accesoGuardado = await nuevoAcceso.save();
        if (!accesoGuardado) return respondError(req, res, 400, 'No se registró el ingreso del guardia');

        respondSuccess(req, res, 201, {
            acceso: accesoGuardado,
            jaulaAsignada: jaula.identificador
        });
    } catch (error) {
        handleError(error, "acceso.controller -> ingresoGuardia");
        respondError(req, res, 500, "Error al registrar el ingreso del guardia y asignar jaula");
    }
}

/**
 * Obtener acceso activo
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getAccesoActivo(req, res) { //Solicitud emitida por el Usuario para Ingresar, Request.body=>id
  try {
    const userId = req.id;
    
    const { error: idError } = userIdSchema.validate({ id: userId });
    if (idError) return respondError(req, res, 400, idError.message);

    const [acceso, accesoError] = await accesoService.getAccesoActivo(userId);
    if (accesoError) return respondError(req, res, 500, accesoError);
    if(!acceso) return respondError(req, res, 400, 'No se obtuvo el acceso activo');
    respondSuccess(req, res, 200, acceso);
  } catch (error) {
    handleError(error, "acceso.controller -> getAccesoActivo");
    respondError(req, res, 500, "No obtuvo el acceso activo");
  }
}

async function salidaGuardia(req, res) {
  try {
      const guardiaId = req.id; 
      const jaulaId = req.body.jaulaId;  

      const jaula = await Jaula.findById(jaulaId);
      if (!jaula) {
          return respondError(req, res, 404, 'Jaula no encontrada');
      }

      if (jaula.guardiaAsignado === null) {
        return respondError(req, res, 400, 'No hay un guardia asignado a esta jaula');
    }

      if (jaula.guardiaAsignado.toString() !== guardiaId) {
          return respondError(req, res, 403, 'No autorizado para registrar salida en esta jaula');
      }

    

      jaula.guardiaAsignado = null;
      await jaula.save();

      const acceso = await Acceso.findOne({ usuario: guardiaId, salida: null });
      if (acceso) {
          acceso.salida = new Date();
          await acceso.save();
      }

      respondSuccess(req, res, 200, { message: 'Salida registrada con éxito', jaula: jaula.identificador });
  } catch (error) {
      handleError(error, "acceso.controller -> salidaGuardia");
      respondError(req, res, 500, "Error al registrar la salida del guardia");
  }
}

async function salidaGuardiaAdmin(req, res) {
  try {
      const jaulaId = req.body.jaulaId;  
      const jaula = await Jaula.findById(jaulaId).populate('guardiaAsignado');
      if (!jaula) {
          return respondError(req, res, 404, 'Jaula no encontrada');
      }

      if (!jaula.guardiaAsignado) {
          return respondError(req, res, 400, 'No hay guardia asignado a esta jaula');
      }

      const guardiaId = jaula.guardiaAsignado._id;

      jaula.guardiaAsignado = null;
      await jaula.save();

      const acceso = await Acceso.findOne({ usuario: guardiaId, salida: null });
      if (acceso) {
          acceso.salida = new Date();
          await acceso.save();
      }

      respondSuccess(req, res, 200, { message: 'Salida del guardia registrada con éxito', jaula: jaula.identificador });
  } catch (error) {
      handleError(error, "acceso.controller -> salidaGuardiaAdmin");
      respondError(req, res, 500, "Error al registrar la salida del guardia");
  }
}


module.exports = {
    registrarIngreso,
    registrarSalida,
    validarToken,
    ingresoInvitado,
    ingresoGuardia,
    salidaGuardia,
    salidaGuardiaAdmin,
    getAccesoActivo
};