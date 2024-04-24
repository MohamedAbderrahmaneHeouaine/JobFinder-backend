const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError.js')
const logout = async (req, res)=>{
     res.clearCookie("accessToken", {
        sameSite: 'none',
        secure: true
     }).status(200).send('user has been logged out')
}
const register = async (req, res, next)=>{
   try {
    const hash = bcrypt.hashSync(req.body.password, 5)
    const newUser = new User({
         ...req.body,
         password: hash
        })
    await newUser.save()
    res.status(201).send('user has been created')
   } catch (error) {
        next(error)
    }
}
const login = async (req, res, next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
    
        if(!user) return next(createError(404, "User not found"))
         const isCorrect = bcrypt.compareSync(req.body.password,user.password)
         
         if(!isCorrect) return res.status(404).send("wrong password or username")
         const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller
            },
            process.env.JWT_KEY
         )
         res.cookie('accessToken', token, 
         {
            httpOnly:true
         }).status(200).send(user)
    } catch (error) {
        res.status(500).send('something went wrong')
    }
}
module.exports = {login, register, logout}