const Joi = require('joi');

const guardiaIdSchema = Joi.object({
  id: Joi.string().required() 
});

const guardiaSchema = Joi.object({
  rut: Joi.string()
  .required()
  .pattern(/^\d{8}-[\dkK]$/)
  .messages({
      "string.empty": "El RUT no puede estar vacío.",
      "any.required": "El RUT es obligatorio.",
      "string.pattern.base": "El RUT debe tener el formato 11111111-1."
  }),
  nombre: Joi.string()
    .required()
    .min(3)                      
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)  
    .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.pattern.base": "El nombre debe contener solo letras y espacios.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.max": "El nombre debe tener un máximo de 50 caracteres.",
  }),
  apellido: Joi.string()
    .required()
    .min(3)                     
    .max(50)                     
    .pattern(/^[a-zA-Z\s]+$/) 
    .messages({
        "string.empty": "El apellido no puede estar vacío.",
        "any.required": "El apellido es obligatorio.",
        "string.pattern.base": "El apellido debe contener solo letras y espacios.",
        "string.min": "El apellido debe tener al menos 3 caracteres.",
        "string.max": "El apellido debe tener un máximo de 50 caracteres.",
  }),
  fono: Joi.string()
  .length(9)                  
  .pattern(/^9\d{8}$/)        
  .required()
  .messages({
      "string.empty": "El teléfono no puede estar vacío.",
      "any.required": "El teléfono es obligatorio.",
      "string.length": "El teléfono debe tener exactamente 9 dígitos.",
      "string.pattern.base": "El teléfono debe comenzar con 9 y no debe contener letras",
  }),
  correo: Joi.string().email().required().trim().messages({
      "string.empty": "El correo no puede estar vacío.",
      "any.required": "El correo es obligatorio.",
      "string.base": "El correo debe ser de tipo string.",
      "string.email": "El correo debe tener formato correcto."
  }),
  password: Joi.string().required().min(5).custom((value, helpers) => {
    if (value === '12345') {
        return helpers.message('La contraseña no puede ser 12345.');
    }
    return value;
  }).messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo string.",
      "string.min": "La contraseña debe tener al menos 5 caracteres."
  }),
  rol: Joi.string().valid('Guardia', 'Administrador').default('Guardia').messages({
      "string.base": "El rol debe ser de tipo string.",
      "any.only": "El rol debe ser 'Guardia'."
  }),
  cargo: Joi.string().valid('Guardia').default('Guardia').messages({
      "string.base": "El cargo debe ser de tipo string.",
      "any.only": "El cargo debe ser 'Guardia'."
  }),
  situacion_laboral: Joi.string().required().trim().messages({
      "string.empty": "La situación laboral no puede estar vacía.",
      "any.required": "La situación laboral es obligatoria.",
      "string.base": "La situación laboral debe ser de tipo string."
  }),
});

const guardiaSchema2 = Joi.object({
    rut: Joi.string()
    .required()
    .pattern(/^\d{8}-[\dkK]$/)
    .messages({
        "string.empty": "El RUT no puede estar vacío.",
        "any.required": "El RUT es obligatorio.",
        "string.pattern.base": "El RUT debe tener el formato 11111111-1."
    }),
    nombre: Joi.string()
      .required()
      .min(3)                      
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)  
      .messages({
          "string.empty": "El nombre no puede estar vacío.",
          "any.required": "El nombre es obligatorio.",
          "string.pattern.base": "El nombre debe contener solo letras y espacios.",
          "string.min": "El nombre debe tener al menos 3 caracteres.",
          "string.max": "El nombre debe tener un máximo de 50 caracteres.",
    }),
    apellido: Joi.string()
      .required()
      .min(3)                     
      .max(50)                     
      .pattern(/^[a-zA-Z\s]+$/) 
      .messages({
          "string.empty": "El apellido no puede estar vacío.",
          "any.required": "El apellido es obligatorio.",
          "string.pattern.base": "El apellido debe contener solo letras y espacios.",
          "string.min": "El apellido debe tener al menos 3 caracteres.",
          "string.max": "El apellido debe tener un máximo de 50 caracteres.",
    }),
    fono: Joi.string()
    .length(9)                  
    .pattern(/^9\d{8}$/)        
    .required()
    .messages({
        "string.empty": "El teléfono no puede estar vacío.",
        "any.required": "El teléfono es obligatorio.",
        "string.length": "El teléfono debe tener exactamente 9 dígitos.",
        "string.pattern.base": "El teléfono debe comenzar con 9 y no debe contener letras",
    }),
    correo: Joi.string().email().required().trim().messages({
        "string.empty": "El correo no puede estar vacío.",
        "any.required": "El correo es obligatorio.",
        "string.base": "El correo debe ser de tipo string.",
        "string.email": "El correo debe tener formato correcto."
    }),
    rol: Joi.string().valid('Guardia', 'Administrador').default('Guardia').messages({
        "string.base": "El rol debe ser de tipo string.",
        "any.only": "El rol debe ser 'Guardia'."
    }),
    cargo: Joi.string().valid('Guardia').default('Guardia').messages({
        "string.base": "El cargo debe ser de tipo string.",
        "any.only": "El cargo debe ser 'Guardia'."
    }),
    situacion_laboral: Joi.string().required().trim().messages({
        "string.empty": "La situación laboral no puede estar vacía.",
        "any.required": "La situación laboral es obligatoria.",
        "string.base": "La situación laboral debe ser de tipo string."
    }),
  });

module.exports = { guardiaIdSchema, guardiaSchema, guardiaSchema2 };

