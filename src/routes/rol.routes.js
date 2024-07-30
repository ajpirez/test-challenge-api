const {Router} = require("express");
const {AuthMiddleware, RolMiddleware} = require("../middlewares");

module.exports = function ({RolController}) {
    const router = Router();

    router.get("/:rolId", AuthMiddleware, RolMiddleware.ensureHasRol('Admin'), RolController.get);
    router.get("/", AuthMiddleware, RolMiddleware.ensureHasRol('Admin'), RolController.getAll);
    router.patch("/addRolToUser", AuthMiddleware, RolMiddleware.ensureHasRol('Admin'), RolController.addRoleToUser);
    router.patch("/deleteRolToUser", AuthMiddleware, RolMiddleware.ensureHasRol('Admin'), RolController.deleteRoleToUser);
    return router;
};
