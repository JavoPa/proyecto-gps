"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de crear y modificar jaula
 * @constant {Object}
 */
const jaulaSchema = Joi.object({
    ubicacion: Joi.string()
        .required()
        .messages({
            "string.empty": "La ubicación no puede estar vacía.",
            "any.required": "La ubicación es obligatoria.",
            "string.base": "La ubicación debe ser de tipo string.",
        }),
    capacidad: Joi.number()
        .positive()
        .max(200)
        .required()
        .messages({
            "number.base": "La capacidad debe ser un número.",
            "number.positive": "La capacidad debe ser un número positivo.",
            "number.max": "La capacidad debe ser menor o igual a 200.",
            "any.required": "La capacidad es obligatoria.",
        }),
    identificador: Joi.string()
        .max(100)
        .pattern(/^[a-zA-Z0-9\s\S]*$/)
        .required()
        .messages({
            "string.empty": "El identificador no puede estar vacío.",
            "any.required": "El identificador es obligatorio.",
            "string.max": "El identificador debe tener menos de 200 caracteres.",
            "string.pattern.base": "El identificador debe contener solo letras, números y símbolos.",
        })
});

module.exports = { jaulaSchema };
