const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

module.exports = function (req, res, next) {
    if (!req.headers["authorization"]) {
        const error = new Error();
        error.message = "Authorization is required";
        error.status = 400;
        throw error;
    }
    const token = req.headers["authorization"].split(' ')[1];
    if (!token) {
        const error = new Error();
        error.message = "Token must be sent";
        error.status = 400;
        throw error;
    }

    jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
        if (err) {
            const error = new Error();
            error.message = "Invalid token";
            error.status = 401;
            throw error;
        }

        req.user = decodedToken.user;
        next();
    });
};
