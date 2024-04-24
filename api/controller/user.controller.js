const User = require('../models/user.model')
const createError = require('../utils/createError.js')

const deleteUser = async(req, res, next) =>{
    const user = await User.findById(req.params.id)

  
        if(req.userId !== String(user._id)){
            return next(createError(403,"you can delete only your account"));
        }
        await User.findByIdAndDelete(req.params.id) 
        res.status(201).send('deleted')
    
   
}
const getUser = async(req, res, ) =>{
    const user = await User.findById(req.params.id)

    res.status(200).send(user)
    
   
}   
module.exports = {deleteUser, getUser}