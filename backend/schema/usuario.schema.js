"use strict";

const Joi = require("joi");
const ROLES = require("../constants/roles.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
// const userBodySchema = Joi.object({
//   nombres: Joi.string().required().messages({
//     "string.empty": "El nombre no puede estar vacío.",
//     "any.required": "El nombre es obligatorio.",
//     "string.base": "El nombre debe ser de tipo string.",
//   }),
//   password: Joi.string().required().min(5).messages({
//     "string.empty": "La contraseña no puede estar vacía.",
//     "any.required": "La contraseña es obligatoria.",
//     "string.base": "La contraseña debe ser de tipo string.",
//     "string.min": "La contraseña debe tener al menos 5 caracteres.",
//   }),
//   email: Joi.string().email().required().messages({
//     "string.empty": "El email no puede estar vacío.",
//     "any.required": "El email es obligatorio.",
//     "string.base": "El email debe ser de tipo string.",
//     "string.email": "El email debe tener un formato válido.",
//   }),
//   roles: Joi.array()
//     .items(Joi.string().valid(...ROLES))
//     .required()
//     .messages({
//       "array.base": "El rol debe ser de tipo array.",
//       "any.required": "El rol es obligatorio.",
//       "string.base": "El rol debe ser de tipo string.",
//       "any.only": "El rol proporcionado no es válido.",
//     }),
//   newPassword: Joi.string().min(5).messages({
//     "string.empty": "La contraseña no puede estar vacía.",
//     "string.base": "La contraseña debe ser de tipo string.",
//     "string.min": "La contraseña debe tener al menos 5 caracteres.",
//   }),
//   rut: Joi.number().integer().required().min(5).messages({
//     "string.empty": "El rut no puede estar vacío.",
//     "any.required": "El rut es obligatorio.",
//     "string.base": "El rut debe ser tipo int.",
//     "string.min": "El rut debe contener al menos 5 numeros",
    
//   }),
// }).messages({
//   "object.unknown": "No se permiten propiedades adicionales.",
// });

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

// validar solo rut

const rutSchema = Joi.object({
  rut: Joi.string().min(9).max(10).messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
  })
})

// validador crear usuario

const usuariosShema = Joi.object({
  rut: Joi.string().min(9).max(12).required().messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
    "string.min": "Rut invalido"
  }),
  nombre: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+(?:[-' ][A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+)*$/).max(30).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
  }),
  apellido: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+(?:[-' ][A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+)*$/).max(30).required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
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
  password: Joi.string().alphanum().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacío.",
    "string.alphanum": "La contraseña debe ser alfanumérica.",
    "string.min": "La contraseña debe contener al menos 5 caracteres.",
  }),
  rol: Joi.string().valid(...ROLES).required().messages({
    "string.empty": "El rol no puede estar vacío.",
    "any.required": "El rol es obligatorio.",
    "string.base": "El rol debe ser de tipo string.",
    "any.only": "El rol proporcionado no es válido.",
  }),
  situacion: Joi.string().required().messages({
    "string.empty": "El cargo no puede estar vacío.",
    "any.required": "El cargo es obligatorio.",
    "string.base": "El cargo debe ser de tipo string.",
  }),
})


const estudianteSchema = Joi.object({
  rut: Joi.string().min(9).max(12).required().messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
  }),
  nombre: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+(?:[-' ][A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+)*$/).max(30).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
  }),
  apellido: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+(?:[-' ][A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+)*$/).max(30).required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
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
  password: Joi.string().alphanum().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacío.",
    "string.alphanum": "La contraseña debe ser alfanumérica.",
    "string.min": "La contraseña debe contener al menos 5 caracteres.",
  }),
  rol: Joi.string().valid(...ROLES).required().messages({
    "string.empty": "El rol no puede estar vacío.",
    "any.required": "El rol es obligatorio.",
    "string.base": "El rol debe ser de tipo string.",
    "any.only": "El rol proporcionado no es válido.",
  }),
  situacion: Joi.string().required().messages({
    "string.empty": "El cargo no puede estar vacío.",
    "any.required": "El cargo es obligatorio.",
    "string.base": "El cargo debe ser de tipo string.",
  }),
  carrera: Joi.string().required().messages({
    "string.empty": "La carrera no puede estar vacío.",
    "any.required": "La carrera es obligatoria.",
    "string.base": "La carrera debe ser de tipo string.",
  }),
})

const guardiaSchema = Joi.object({
  rut: Joi.string().min(9).max(10).required().messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
  }),
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido no puede estar vacío.",
    "any.required": "El apellido es obligatorio.",
    "string.base": "El apellido debe ser de tipo string.",
  }),
  fono: Joi.number()
    .integer()
    .max(999999999)
    .required()
    .messages({
      "number.empty": "El fono no puede estar vacío.",
      "any.required": "El fono es obligatorio.",
      "number.base": "El fono debe ser de tipo number.",
      "number.max": "El fono debe contener al menos 9 numeros",
    }),
  correo: Joi.string().email().required().messages({
    "string.empty": "El correo no puede estar vacío.",
    "any.required": "El correo es obligatorio.",
    "string.base": "El correo debe ser de tipo string.",
    "string.email": "El correo debe tener un formato válido.",
  }),
  password: Joi.string().alphanum().required().min(5).messages({

  }),
  rol: Joi.string().valid(...ROLES).required().messages({
    "string.empty": "El rol no puede estar vacío.",
    "any.required": "El rol es obligatorio.",
    "string.base": "El rol debe ser de tipo string.",
    "any.only": "El rol proporcionado no es válido.",
  }),
  cargo: Joi.string().required().messages({
    "string.empty": "El cargo no puede estar vacío.",
    "any.required": "El cargo es obligatorio.",
    "string.base": "El cargo debe ser de tipo string.",
  }),
  situacion_laboral: Joi.string().required().messages({
    "string.empty": "La situacion laboral no puede estar vacío.",
    "any.required": "La situacion laboral es obligatoria.",
    "string.base": "La situacion laboral debe ser de tipo string.",
  }),
})

const academicoSchema = Joi.object({
  rut: Joi.string().min(9).max(10).required().messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
  }),
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido no puede estar vacío.",
    "any.required": "El apellido es obligatorio.",
    "string.base": "El apellido debe ser de tipo string.",
  }),
  fono: Joi.number()
    .integer()
    .max(999999999)
    .required()
    .messages({
      "number.empty": "El fono no puede estar vacío.",
      "any.required": "El fono es obligatorio.",
      "number.base": "El fono debe ser de tipo number.",
      "number.max": "El fono debe contener al menos 9 numeros",
    }),
  correo: Joi.string().email().required().messages({
    "string.empty": "El correo no puede estar vacío.",
    "any.required": "El correo es obligatorio.",
    "string.base": "El correo debe ser de tipo string.",
    "string.email": "El correo debe tener un formato válido.",
  }),
  password: Joi.string().alphanum().required().min(5).messages({

  }),
  rol: Joi.string().valid(...ROLES).required().messages({
    "string.empty": "El rol no puede estar vacío.",
    "any.required": "El rol es obligatorio.",
    "string.base": "El rol debe ser de tipo string.",
    "any.only": "El rol proporcionado no es válido.",
  }),
  situacion: Joi.string().required().messages({
    "string.empty": "La situacion laboral no puede estar vacío.",
    "any.required": "La situacion laboral es obligatoria.",
    "string.base": "La situacion laboral debe ser de tipo string.",
  }),
})

const funcionarioSchema = Joi.object({
  rut: Joi.string().min(9).max(10).required().messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
  }),
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido no puede estar vacío.",
    "any.required": "El apellido es obligatorio.",
    "string.base": "El apellido debe ser de tipo string.",
  }),
  fono: Joi.number()
    .integer()
    .max(999999999)
    .required()
    .messages({
      "number.empty": "El fono no puede estar vacío.",
      "any.required": "El fono es obligatorio.",
      "number.base": "El fono debe ser de tipo number.",
      "number.max": "El fono debe contener al menos 9 numeros",
    }),
  correo: Joi.string().email().required().messages({
    "string.empty": "El correo no puede estar vacío.",
    "any.required": "El correo es obligatorio.",
    "string.base": "El correo debe ser de tipo string.",
    "string.email": "El correo debe tener un formato válido.",
  }),
  password: Joi.string().alphanum().required().min(5).messages({

  }),
  rol: Joi.string().valid(...ROLES).required().messages({
    "string.empty": "El rol no puede estar vacío.",
    "any.required": "El rol es obligatorio.",
    "string.base": "El rol debe ser de tipo string.",
    "any.only": "El rol proporcionado no es válido.",
  }),
  situacion: Joi.string().required().messages({
    "string.empty": "La situacion laboral no puede estar vacío.",
    "any.required": "La situacion laboral es obligatoria.",
    "string.base": "La situacion laboral debe ser de tipo string.",
  }),
})

const administradorSchema = Joi.object({
  rut: Joi.string().min(9).max(10).required().messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
  }),
  nombre: Joi.string().pattern(/^[A-Za-z\s]+$/).max(30).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
  }),
  apellido: Joi.string().pattern(/^[A-Za-z\s]+$/).max(30).required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
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
  password: Joi.string().alphanum().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacío.",
  }),
  rol: Joi.string().valid(...ROLES).required().messages({
    "string.empty": "El rol no puede estar vacío.",
    "any.required": "El rol es obligatorio.",
    "string.base": "El rol debe ser de tipo string.",
    "any.only": "El rol proporcionado no es válido.",
  }),
  situacion: Joi.string().required().messages({
    "string.empty": "El cargo no puede estar vacío.",
    "any.required": "El cargo es obligatorio.",
    "string.base": "El cargo debe ser de tipo string.",
  }),  
})

const nombreSchema = Joi.object({
  nombre: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+(?:[-' ][A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+)*$/).max(30).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
  })
})
const apellidoSchema = Joi.object({
  apellido: Joi.string().pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+(?:[-' ][A-Za-zÁÉÍÓÚÑáéíóúñüÜ]+)*$/).max(30).required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    'string.pattern.base': "El nombre solo puede contener letras",
    "string.max": "El nombre debe contener menos de 30 caracteres",
  })
})
const fonoSchema = Joi.object({
  fono: Joi.string().pattern(/^9\d{8}$/).messages({
      "number.empty": "El fono no puede estar vacío.",
      "number.max": "El fono debe contener al menos 9 numeros",
      'string.pattern.base': 'El fono debe comenzar con 9 y tener 9 digitos, no se damiten letras ni + 56 antes del numero'
    })
})
const passwordSchema = Joi.object({
  password: Joi.string().alphanum().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacío.",
  })
})



module.exports = { /*userBodySchema, */
  userIdSchema,
  usuariosShema,
  rutSchema,
  estudianteSchema,
  guardiaSchema,
  academicoSchema,
  funcionarioSchema,
  administradorSchema,
  nombreSchema,
  apellidoSchema,
  fonoSchema,
  passwordSchema
};