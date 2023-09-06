const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { performance } = require("perf_hooks");
const { UnauthenticatedError, BadRequestError } = require('../errors/index');


const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }
    const id = performance.now();
    const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    console.log("Token created");
    // console.log(username, password);
    res.send({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
    // console.log(authJwt);
    const luckyNumber = performance.now();
    const decoded = req.user; //getting this data from authMiddleware
    res.status(200).json({ msg: `Hello, ${decoded.username}`, secret: `Here is your authorized data, your lucky number is  ${luckyNumber}` })
    throw CustomAPIError('Not authorized to access this route', 401)

}

module.exports = {
    login, dashboard
}