const {Router} = require("express");
const {ValidateData} = require('../middlewares')
module.exports = function ({
    AuthController,
    UserSchema,
    AuthSchema
}) {
    const router = Router();

    router.post("/signup", ValidateData(UserSchema), AuthController.signUp);
    router.post("/signin", ValidateData(AuthSchema), AuthController.signIn);

    router.post('/seed', function (req, res, next) {
        require('../seed')
        return res.json({msg: 'ok'})
    })

    return router;
};
