"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const UsuarioService = require("../services/usuario.service.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los usuarios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUsuarios(req, res) {
    try {
      const [usuarios, errorUsuarios] = await UsuarioService.getUsers();
      if (errorUsuarios) return respondError(req, res, 404, errorUsuarios);
  
      usuarios.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, usuarios);
    } catch (error) {
      handleError(error, "usuario.controller -> getUsers");
      respondError(req, res, 400, error.message);
    }
  }

  module.exports = {
    getUsuarios
  }