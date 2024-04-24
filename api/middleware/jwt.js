const jwt = require('jsonwebtoken')
const createError = require('../utils/createError.js')
const verifyToken = (req, res, next) =>{
    const token = req.cookies.accessToken;
    if (!token) {
        return next(createError(401,"you are not auth"))
    }
    jwt.verify(token,process.env.JWT_KEY,async (err,payload) =>{
        if (err) return next(createError(403,"token is not valid"));
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next()
    })
}
module.exports = verifyToken