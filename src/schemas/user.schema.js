const Joi = require('@hapi/joi')

const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).allow(''),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    age: Joi.number().min(6),
    grade: Joi.number().valid(1, 2, 3, 4, 5),
    rols: Joi.string()
})

module.exports = schema