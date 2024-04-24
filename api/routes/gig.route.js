const express = require('express');
const { createGig, deleteGig, getGig, getGigs } = require('../controller/gig.controller');
const verifyToken = require('../middleware/jwt');
const router = express.Router()
 
router.post("/",verifyToken, createGig)
router.delete('/:id',verifyToken, deleteGig)
router.get('/single/:id', getGig)
router.get('/', getGigs)
module.exports = router;