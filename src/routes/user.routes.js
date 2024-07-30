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
    router.get("/:userId", AuthMiddleware, RolMiddleware.ensureHasRol('Admin'), UserController.get);
    router.patch("/:userId", AuthMiddleware, RolMiddleware.ensureHasRol('Admin'), ValidateData(UserUpdateSchema), UserController.update);
    router.delete("/:userId", AuthMiddleware, RolMiddleware.ensureHasRol('Admin'), UserController.delete);

    return router;
};
