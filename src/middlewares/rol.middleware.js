exports.ensureHasRol = function ensureHasRol() {
    const {Rol} = require("../models");
    let roleTypes = [...arguments]
    return async function (req, res, next) {
        for (let type of roleTypes) {
            if (type.constructor != String) {
                return res.status(400).json({
                    errors: [
                        {
                            field: 'Rol',
                            title: `When calling the role check function, the arguments must be strings`,
                        },
                    ],
                })
            }
        }
        try {
            let rol = await Rol.findOne({
                UserId: req.user.id,
                type:
                    {
                        $in: roleTypes
                    }
            })

            if (!rol) {
                return res.status(403).json({
                    errors: [
                        {
                            field: 'Rol',
                            title: `You do not have sufficient permissions, only an Administrator has access`,
                        },
                    ],
                })
            } else {
                let roles = await Rol.find({
                    UserId: req.user._id,
                })
                req.user.roles = roles
                return next()
            }
        } catch (error) {
            return res.status(500).json({
                errors: [
                    {
                        field: 'Rol',
                        title: error.message,
                    },
                ],
            })
        }
    }
};
