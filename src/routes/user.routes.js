const {Router} = require("express");
const {
    AuthMiddleware,
    ParseIntMiddleware,
    RolMiddleware,
    ValidateData
} = require("../middlewares");

module.exports = function ({
    UserController,
    UserUpdateSchema
}) {
    const router = Router();

    router.get("", AuthMiddleware, RolMiddleware.ensureHasRol('Admin'), [ParseIntMiddleware], UserController.getAll);
    router.get("/:userId", AuthMiddleware, UserController.get);
    router.patch("/:userId", AuthMiddleware, ValidateData(UserUpdateSchema), UserController.update);
    router.delete("/:userId", AuthMiddleware, UserController.delete);

    return router;
};
