const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UnauthenticatedError } = require('../errors/index');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided');
    }
    try {
        const authJwt = authHeader.split(' ')[1];
        const decoded = jwt.verify(authJwt, process.env.JWT_SECRET);
        console.log("decoded :", decoded);
        const { id, username } = decoded;
        req.user = { id, username };
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
}

module.exports = authenticationMiddleware