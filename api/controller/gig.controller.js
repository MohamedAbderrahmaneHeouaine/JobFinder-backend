
const Gig = require('../models/gig.model')
const createError = require('../utils/createError')

const createGig = async (req, res, next)=>{
    if (!req.isSeller) return next(createError(403, 'Only sellers can create a gig'))

     newGig = new Gig({
        ...req.body,
        userId : req.userId
       
    })
    try {
        const saveGig = await newGig.save();
        res.status(201).json(saveGig)
    } catch (error) {
        next(error)
    }
}
const deleteGig = async (req, res, next)=>{
    try {
        const gig = await Gig.findById(req.params.id)

        if (gig.userId !== req.userId) {
            return next(createError(403, "you can delete only your gig"))
        }
        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send('gig has been deleted')
    } catch (error) {
        next(error)
    }
}
const getGig = async (req, res, next)=>{
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) { return next(createError(404,"gig not found"))}
        res.status(200).send(gig)
    } catch (error) {
        next(error)
    }
}
const getGigs = async (req, res, next)=>{
    const q = req.query;
    try {
        const filters = {
            ...(q.userId && { userId: q.userId }),
            ...(q.cat && { cat: q.cat }),
            ...((q.min || q.max) && {
              price: {
                ...(q.min && { $gt: q.min }),
                ...(q.max && { $lt: q.max }),
              },
            }),
            ...(q.search && { title: { $regex: q.search, $options: "i" } }),
          };
        const gigs = await Gig.find(filters).sort({[q.sort]:-1})
        res.status(200).send(gigs)
    } catch (error) {
        next(error)
    }
}
module.exports = {createGig, deleteGig, getGig, getGigs}