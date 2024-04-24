const express = require('express')
const router = express.Router()
const {createMessage, getMessage} = require('../controller/message.controller');
const verifyToken = require('../middleware/jwt');
router.post("/",verifyToken, createMessage)
router.get("/:id",verifyToken, getMessage)
module.exports = router;