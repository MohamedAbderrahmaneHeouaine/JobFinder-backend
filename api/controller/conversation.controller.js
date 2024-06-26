const createError = require("../utils/createError")
const Conversation = require("../models/conversation.model")
const createConversations = async (req, res, next)=>{
    const newConversation = await new Conversation({
        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId ,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(201).send(savedConversation)
    } catch (error) {
        next(error)
    }
}
const updateConversation = async (req, res, next)=>{

    try {
        const updateConversation = await Conversation.findOneAndUpdate(
            {id: req.params.id},
            {
                $set: {
                  ...(req.isSeller ? {readBySeller: true} : {readByBuyer: true})  
                },
            },
            {new: true}
        )
        res.status(200).send(updateConversation)
    } catch (error) {
        next(error)
    }
}
const getSingleConversations = async(req, res, next) => {
    try {
     
        const conversation = await Conversation.findOne({id:req.params.id})
        res.status(200).send(conversation)
    } catch (error) {
        next(error)
    }
}
const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find(
          req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
        ).sort({ updatedAt: -1 });
        res.status(200).send(conversations);
      } catch (err) {
        next(err);
      }
}
module.exports = {createConversations, updateConversation, getSingleConversations, getConversations}