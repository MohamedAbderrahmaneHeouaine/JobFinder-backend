const Order = require('../models/order.model')
const Gig = require('../models/gig.model')
const getOrders = async (req, res, next) => {
    try {
      const orders = await Order.find({
        ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
        isCompleted: true,
      });
  
      res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  };
const createOrder = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigId)
      const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.cover,
        buyerId: req.userId,
        sellerId: gig.userId,
        price:gig.price,
        payment_intent: "temporary"

      })
      await newOrder.save()
  
      res.status(200).send("Order has been created.");
    } catch (err) {
      next(err);
    }
  };
module.exports = {createOrder, getOrders}