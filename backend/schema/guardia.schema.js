const Joi = require('joi');
const guardiaIdSchema = Joi.object({
  id: Joi.string().required() 
});

module.exports = {
    guardiaIdSchema
    };
    