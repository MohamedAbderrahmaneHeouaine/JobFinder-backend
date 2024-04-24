const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/jwt')
const {getConversations, getSingleConversations, createConversations, updateConversation} = require('../controller/conversation.controller')
router.get("/", verifyToken, getConversations)
router.post("/", verifyToken, createConversations)
router.get("/single/:id", verifyToken, getSingleConversations)
router.put("/:id", verifyToken, updateConversation)
module.exports = router;