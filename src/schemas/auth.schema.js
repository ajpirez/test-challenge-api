const Joi = require('@hapi/joi')

const schema = Joi.object({
    email: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
})

module.exports = schema