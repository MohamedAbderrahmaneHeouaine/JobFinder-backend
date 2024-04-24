const express = require('express')
const verifyToken = require('../middleware/jwt')
const {deleteUser, getUser} = require('../controller/user.controller')

const router = express.Router()

router.delete("/:id",verifyToken, deleteUser)
router.get("/:id",verifyToken, getUser)
module.exports = router;   