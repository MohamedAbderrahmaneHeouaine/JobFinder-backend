const gigModel = require("../models/gig.model")
const reviewModel = require("../models/review.model")
const createError = require("../utils/createError")

const createReview = async (req, res, next)=>{
    if(req.isSeller){
        return next(createError(403, "sellers can't create a review"))}
        const newReview = new reviewModel({
            userId:req.userId,
            gigId:req.body.gigId,
            desc:req.body.desc,
            star:req.body.star
        })
        try {
            const review = await reviewModel.findOne({
                gigId: req.body.gigId,
                userId: req.userId 
            })
            if(review) return next(createError(403, "you are already created a review for this gig"))
            const savedReview = await newReview.save()
            await gigModel.findByIdAndUpdate(req.body.gigId,{
                $inc: { totalStars: req.body.star, starNumber: 1}
            })
            res.status(201).send(savedReview)
        } catch (error) {
            next(error)
        }
    
 
}
const getReview = async (req, res, next)=>{
    try {
        const reviews = await reviewModel.find({gigId:req.params.gigId})
        res.status(200).send(reviews)
    } catch (error) {
        next(error)
    }
}
const deleteReview = (req, res)=>{

}
module.exports = {createReview, getReview, deleteReview}