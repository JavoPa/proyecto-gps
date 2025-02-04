"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de crear bicicleta
 * @constant {Object}
 */
const bicicletaSchema = Joi.object({
    marca: Joi.string()
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.empty": "La marca no puede estar vacía.",
        "any.required": "La marca es obligatoria.",
        "string.base": "La marca debe ser de tipo string.",
        "string.pattern.base": "La marca solo puede contener letras y espacios.",
      }),
    modelo: Joi.string()
      .messages({
        "string.empty": "El modelo no puede estar vacío.",
        "string.base": "El modelo debe ser de tipo string.",
      }),
    color: Joi.string()
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.empty": "El color no puede estar vacío.",
        "any.required": "El color es obligatorio.",
        "string.base": "El color debe ser de tipo string.",
        "string.pattern.base": "El color solo puede contener letras y espacios.",
      }),
    tipo: Joi.string()
      .messages({
        "string.empty": "El tipo no puede estar vacío.",
        "string.base": "El tipo debe ser de tipo string.",
      }),
    descripcion: Joi.string()
      .messages({
        "string.empty": "La descripción no puede estar vacía.",
        "string.base": "La descripción debe ser de tipo string.",
      }),
    estado: Joi.string()
      .messages({
        "string.empty": "El estado no puede estar vacío.",
        "string.base": "El estado debe ser de tipo string.",
      }),
    });
  
  module.exports = { bicicletaSchema };