const express = require("express");
const  verifyToken  = require("../middleware/jwt.js");
const { getOrders, createOrder } = require ("../controller/order.controller.js");

const router = express.Router();

router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
module.exports = router;
