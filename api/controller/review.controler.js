import Gig from "../models/gig.js"
import Review from "../models/review.js"
import createError from "../util/createerror.js"

export const createreview=async(req,res,next)=>{
    if(req.isSeller){
        return next(createError(403,"Seller can't create a reeview"))
    }
    const newreview=new Review({
        userId:req.userId,
        gigId:req.body.gigId,
        desc:req.body.desc,
        star:req.body.star
    });
    try {
        const review=await Review.findOne({
            userId:req.userId,
            gigId:req.body.gigId,
        })
        if(review){
            return next(createError(403,"You Alredy created a review for this gig"))
        }
        const saved=await newreview.save();
        await Gig.findByIdAndUpdate(req.body.gigId, {
            $inc: { totalStars: req.body.star, starNumber: 1 },
          });
        res.status(201).send(saved)
        
    } catch (error) {
        next(error)
    }
}
export const getreview=async(req,res,next)=>{
    try {
        const reviews=await Review.find({gigId:req.params.gigId})
        res.status(200).send(reviews)
    } catch (error) {
        next(error)
    }
}
export const deletereview=async(req,res,next)=>{
    await Review.findByIdAndDelete(req.params.id)
    res.status(200).send("Successfull Deleted")
}