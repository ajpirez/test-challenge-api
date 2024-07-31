const Joi = require('@hapi/joi')

const schema = Joi.object({
    ids: Joi.array().items(Joi.string().min(1)).min(1),
})

module.exports = schema