const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const {NotFoundMiddleware, ErrorMiddleware} = require("../middlewares");
const swaggerUI = require("swagger-ui-express");
const {SWAGGER_PATH} = require("../config");
const swaggerDocument = require(SWAGGER_PATH);
const morgan = require('morgan')


module.exports = function ({
                               UserRoutes,
                               RolRoutes,
                               AuthRoutes,
                           }) {
    const router = express.Router();
    const apiRoutes = express.Router();
    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())
        .use(morgan('dev'))

    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/rol", RolRoutes);
    apiRoutes.use("/auth", AuthRoutes);
    router.use("/v1/api", apiRoutes);
    router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);


    return router;
};
