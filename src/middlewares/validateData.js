const Boom = require('@hapi/boom')
module.exports = (schema) => {
    return async (req, res, next) => {
        next();
        try {
            await schema.validateAsync(req.body);
        } catch (error) {
            res.status(400).json(Boom.badData(error))
        }
    }
}