const {Router} = require("express");
const {
    AuthMiddleware,
    ParseIntMiddleware,
    ValidateData
} = require("../middlewares");

module.exports = function ({
    UserController,
    UserUpdateSchema,
    UserDeleteAllSchema
}) {
    const router = Router();

    router.get("", AuthMiddleware,  [ParseIntMiddleware], UserController.getAll);
    router.get("/:userId", AuthMiddleware, UserController.get);
    router.patch("/:userId", AuthMiddleware, ValidateData(UserUpdateSchema), UserController.update);
    router.delete("/:userId", AuthMiddleware, UserController.delete);
    router.post("/delete-ids", AuthMiddleware,ValidateData(UserDeleteAllSchema), UserController.deleteMany);

    return router;
};
