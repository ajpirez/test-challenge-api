const Joi = require('@hapi/joi')

const schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().min(3),
    password: Joi.string().min(3),
    age: Joi.number().min(6),
    grade: Joi.number().valid(1, 2, 3, 4, 5),
})

module.exports = schema