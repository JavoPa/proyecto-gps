"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de validación de token.
 * @constant {Object}
 */
const tokenSchema = Joi.object({
    token: Joi.string()
      .required()
      .length(4)
      .pattern(/^[0-9]+$/)
      .messages({
        "string.empty": "El token no puede estar vacío.",
        "any.required": "El token es obligatorio.",
        "string.length": "El token debe ser de 4 dígitos.",
        "string.pattern.base": "El token solo puede contener números.",
      }),
    guardiaId: Joi.string()
      .required()
      .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
      .messages({
        "string.empty": "El id de guardia no puede estar vacío.",
        "any.required": "El id de guardia es obligatorio.",
        "string.base": "El id de guardia debe ser de tipo string.",
        "string.pattern.base": "El id guardia proporcionado no es un ObjectId válido.",
      }),
  });
  
  module.exports = { tokenSchema };