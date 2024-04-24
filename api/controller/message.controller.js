const Message = require('../models/message.model')
const Conversation = require('../models/conversation.model')
const createMessage = async(req, res, next)=>{
    const newMessage = new Message({
        conversationId:req.body.conversationId,
        userId: req.userId,
        desc:req.body.desc
    })
try {
   const savedMessage = newMessage.save()
   await Conversation.findOneAndUpdate({id:req.body.conversationId},{
    $set:{
        readBySeller:req.isSeller,
        readByBuyer:!req.isSeller,
        lastMessage: req.body.desc
    }
   },
   {new: true})
    res.status(201).send(savedMessage)
} catch (error) {
    next(error)
}
}
const getMessage = async(req, res, next)=>{
try {
    const messages = await Message.find({conversationId: req.params.id})
    res.status(200).send(messages)
} catch (error) {
    next(error)
}
}
module.exports = {createMessage, getMessage}