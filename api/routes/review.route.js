const express = require('express')
const router = express.Router()
const {createReview, getReview, deleteReview} = require('../controller/review.controller');
const verifyToken = require('../middleware/jwt');
router.post("/",verifyToken, createReview )
router.get("/:gigId", getReview )
router.delete("/",verifyToken, deleteReview )
module.exports = router;