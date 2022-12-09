const Joi = require('joi');

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().lowercase().trim(),
        password: Joi.string().required(),
    })
}