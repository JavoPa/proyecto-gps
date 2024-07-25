"use strict";
const { handleError } = require("../utils/errorHandler");
const Acceso = require("../models/acceso.model.js");
const Invitado = require("../models/invitado.model.js");
const Usuario = require("../models/usuario.model.js");
const Jaula = require("../models/jaula.model.js");

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
    expiryDate.setMinutes(expiryDate.getMinutes() + 2); // El token expira en 2 minutos

    // Busca un acceso pendiente del usuario (entrada y salida null)
    // let acceso = await Acceso.findOne({ usuario: usuarioId, entrada: null, salida: null });

    // Busca un acceso pendiente del usuario (salida null)
    let acceso = await Acceso.findOne({ usuario: usuarioId, salida: null });
    // Si existe un acceso pendiente, se actualiza el token y la fecha de expiración
    if(acceso){
      acceso.token = token;
      acceso.expiryDate = expiryDate;
    }else{ // Si no existe un acceso pendiente, se crea uno nuevo
      acceso = new Acceso({
        token,
        expiryDate,
        usuario: usuarioId,
        entrada: null,
        salida: null
      });
    }
  
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
    // Verificar si el estudiante tiene un token activo (token sin escanear)
    const tokenActivo = await Acceso.findOne({ usuario: usuarioId, entrada: null, expiryDate: { $gt: new Date() } });
    if (tokenActivo) {
      //return [null, 'El usuario ya tiene un token activo. Token: ' + tokenActivo.token];
      return [tokenActivo, null];
    }
    // Verificar si el estudiante ya tiene un acceso sin fecha de salida (bicicleta registrada)
    const accesoExistente = await Acceso.findOne({ usuario: usuarioId, entrada: { $ne: null }, salida: null });
    if (accesoExistente) {
      return [null, 'Ya posees una bicicleta registrada en el sistema.'];
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
 * Registra la salida de un usuario en la base de datos.
 * Modifica el acceso correspondiente al usuario en la base de datos 
 * para registrar la fecha de salida.
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
*/
async function registrarSalida(usuarioId) {
  try {
    // Verificar si el estudiante ya tiene un acceso sin fecha de salida (bicicleta registrada)
    const accesoExistente = await Acceso.findOne({ usuario: usuarioId, entrada: { $ne: null }, salida: null });
    if (!accesoExistente) {
      return [null, 'No posees una bicicleta registrada en el sistema.'];
    }
    
    // Verificar si el estudiante tiene un token activo (token sin escanear)
    const tokenActivo = await Acceso.findOne({ usuario: usuarioId, salida: null, expiryDate: { $gt: new Date() } });
    if (tokenActivo) {
      return[tokenActivo, null];
    }

    // Generar un nuevo token y lo guarda en la base de datos
    const salida = await generarToken(usuarioId);

    // Devolver el token
    return [salida, null];
  } catch (error) {
    handleError(error, "acceso.service -> registrarSalida");
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
    const acceso = await Acceso.findOne({ token })
      .populate({
        path: 'usuario',
        select: '-password',
        populate: {
          path: 'bicicleta',
        },
      });
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
      const jaula = await Jaula.findOne({ guardiaAsignado: guardiaId }); //Buscar la jaula asignada al guardia
      if (jaula) {
        if(jaula.capacidad <= jaula.situacion_actual){
          return [null, 'La jaula está llena'];
        }
        acceso.jaula = jaula._id;
      }
      acceso.entrada = new Date();
    }
    acceso.expiryDate = new Date(); // Establece la fecha de expiración a la fecha y hora actual
    acceso.guardia = guardiaId;
  
    // Guardar el acceso
    await acceso.save();
    return [acceso, null];
  } catch (error) {
    handleError(error, "acceso.service -> validarToken");
    return [null, error];
  }
}
/**
 * Crea un nuevo acceso de en la base de datos.
 * @param {string} guardiaId Id de guardia
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function ingresoInvitado(body, guardiaId) {
  try {
    //Crear el usuario
    let invitado = await Invitado.findOne({ rut: body.rut });
    if(!invitado){
      invitado = new Invitado({
        nombre: body.nombre,
        apellido: body.apellido,
        rut: body.rut,
        fono: body.fono,
        correo: body.correo,
        password: await Usuario.encryptPassword(body.rut), //Contraseña por defecto es el rut
        rol: 'invitado'
      });
      await invitado.save();
    }else{
      // Verificar si el estudiante ya tiene un acceso sin fecha de salida (bicicleta registrada)
      const accesoExistente = await Acceso.findOne({ usuario: invitado._id, entrada: { $ne: null }, salida: null });
      if (accesoExistente) {
        return [null, 'El usuario ya posee una bicicleta registrada en el sistema.'];
      }
      //Actualizar los datos del usuario
      invitado.nombre = body.nombre;
      invitado.apellido = body.apellido;
      invitado.fono = body.fono;
      invitado.correo = body.correo;
      await invitado.save();
    }
    //Validacion de capacidad jaula
    const jaula = await Jaula.findOne({ guardiaAsignado: guardiaId }); //Buscar la jaula asignada al guardia
    if(jaula && (jaula.capacidad <= jaula.situacion_actual)){
      return [null, 'La jaula está llena'];
    }
    //Crear el acceso
    const acceso = new Acceso({
      usuario: invitado._id,
      guardia: guardiaId,
      jaula: jaula ? jaula._id : null,
      entrada: new Date(),
      salida: null
    });
  
    await acceso.save();
    acceso.usuario = invitado;
    // Devolver el ACCESO
    return [acceso, null];
  } catch (error) {
    handleError(error, "acceso.service -> ingresoInvitado");
    return [null, error];
  }
}

/**
 * Obtener un acceso activo
 * @param {string} usuarioId Id de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function getAccesoActivo(usuarioId) {
  try {
    // Buscar si el estudiante ya tiene un acceso sin fecha de salida (bicicleta registrada)
    const accesoExistente = await Acceso.findOne({ usuario: usuarioId, entrada: { $ne: null }, salida: null });
    if (accesoExistente) {
      return ['Bicicleta registrada', null];
    }else{
      return ['Bicicleta no registrada', null];
    }
    // Verificar si el estudiante tiene un token activo (token sin escanear)
    // const accesoActivo = await Acceso.findOne({ usuario: usuarioId, entrada: null, expiryDate: { $gt: new Date() } });
    // if (!accesoActivo) {
    //   return [null, 'No posees un token activo.'];
    // }
  
    // Devolver el token
    //return [accesoActivo, null];
  } catch (error) {
    handleError(error, "acceso.service -> getAccesoActivo");
    return [null, error];
  }
}

  module.exports = {
    registrarIngreso,
    registrarSalida,
    validarToken,
    ingresoInvitado,
    getAccesoActivo
};