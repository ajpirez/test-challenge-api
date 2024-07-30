const Joi = require('@hapi/joi')

const schema = Joi.object({
    type: Joi.string().valid('Admin', 'Client').default('Client'),
    UserId: Joi.string().required(),
})

module.exports = schema