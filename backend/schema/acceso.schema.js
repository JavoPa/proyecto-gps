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
  rut: Joi.string().pattern(/^[0-9]+-[0-9kK]{1}$/).min(9).max(12).required().messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
    "string.min": "Rut debe contener al menos 9 caracteres",
    "string.max": "Rut debe contener menos de 12 caracteres",
    "string.pattern.base": "El rut solo puede contener números y un guión.",
  }),
  nombre: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+(?:[-' ][A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+)*$/).max(30).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
  }),
  apellido: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+(?:[-' ][A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+)*$/).max(30).required().messages({
    "string.empty": "El apellido no puede estar vacío.",
    "string.base": "El apellido debe ser de tipo string.",
    'string.pattern.base': "El apellido solo puede contener letras",
    "string.max": "El apellido debe contener menos de 30 caracteres",
  }),
  fono: Joi.string().pattern(/^9\d{8}$/).messages({
    "number.empty": "El fono no puede estar vacío.",
    "number.max": "El fono debe contener al menos 9 numeros",
    'string.pattern.base': 'El fono debe comenzar con 9 y tener 9 digitos, no se damiten letras ni + 56 antes del numero'
  }),
  correo: Joi.string().email().required().messages({
    "string.empty": "El correo no puede estar vacío.",
    "any.required": "El correo es obligatorio.",
    "string.base": "El correo debe ser de tipo string.",
    "string.email": "El correo debe tener un formato válido.",
  }),
});
  
  module.exports = { tokenSchema, invitadoSchema};