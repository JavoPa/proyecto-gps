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
      })
  });

/**
 * Esquema de validación para el cuerpo de la solicitud de ingreso invitado
 * @constant {Object}
 */
const invitadoSchema = Joi.object({
    nombre: Joi.string()
      .required()
      .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
      }),
    apellido: Joi.string()
      .required()
      .messages({
        "string.empty": "El apellido no puede estar vacío.",
        "any.required": "El apellido es obligatorio.",
        "string.base": "El apellido debe ser de tipo string.",
      }),
    rut: Joi.string()
      .required()
      .pattern(/^[0-9]+[-]{1}[0-9kK]{1}$/)
      .messages({
        "string.empty": "El rut no puede estar vacío.",
        "any.required": "El rut es obligatorio.",
        "string.pattern.base": "El rut debe tener un formato válido.",
      }),
    fono: Joi.string()
      .pattern(/^[0-9]+$/)
      .messages({
        "string.empty": "El teléfono no puede estar vacío.",
        "string.base": "El teléfono debe ser de tipo string.",
        "string.pattern.base": "El teléfono solo puede contener números.",
      }),
});
  
  module.exports = { tokenSchema, invitadoSchema};