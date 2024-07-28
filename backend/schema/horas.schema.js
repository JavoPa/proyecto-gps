const Joi = require("joi");

const horaSchema = Joi.object({
    limiteEntrada: Joi.string().required().length(5).pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).messages({
        "string.empty": "El límite de entrada no puede estar vacío.",
        "any.required": "El límite de entrada es obligatorio.",
        "string.base": "El límite de entrada debe ser de tipo string.",
        "string.length": "El límite de entrada debe ser de 5 caracteres.",
        "string.pattern.base": "La hora límite de entrada debe tener un formato HH:MM (24hrs).",
      }),
    limiteSalida: Joi.string().required().length(5).pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).messages({
        "string.empty": "El límite de salida no puede estar vacío.",
        "any.required": "El límite de salida es obligatorio.",
        "string.base": "El límite de salida debe ser de tipo string.",
        "string.length": "El límite de salida debe ser de 5 caracteres.",
        "string.pattern.base": "La hora límite de salida debe tener un formato HH:MM (24hrs).",
      }),
}).custom((obj, helpers) => {
    const { limiteEntrada, limiteSalida } = obj;
    const [entradaHora, entradaMinuto] = limiteEntrada.split(':').map(Number);
    const [salidaHora, salidaMinuto] = limiteSalida.split(':').map(Number);

    if (entradaHora > salidaHora || (entradaHora === salidaHora && entradaMinuto >= salidaMinuto)) {
        return helpers.message("La hora de apertura no puede ser anterior a la hora de cierre");
    }
    return obj;
});

module.exports = { horaSchema };