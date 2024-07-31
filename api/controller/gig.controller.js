import createError from "../util/createerror.js"
import Gig from '../models/gig.js'

export const creategig=async(req,res,next)=>{
    if(!req.isSeller)return next(createError(403,"Only seller can create a gig!"))
    const newgig= new Gig({
        userId:req.userId,
        ...req.body,
})
try {
    const newsaved=await newgig.save();
    res.status(200).json(newsaved)
} catch (error) {
    next(error)
}
} 
export const deletegig=async(req,res,next)=>{
try {
    const gig=await Gig.findById(req.params.id);
    
    if(gig.userId!==req.userId){
        return next(createError(403,"You can delete only your id!!"))
    }
    await Gig.findByIdAndDelete(req.params.id)
    res.status(200).send("gig has been deleted")
} catch (error) {
    next(error)
} 
}
export const getgig=async(req,res,next)=>{
    try {
        const gig =await Gig.findById(req.params.id);
        if(!gig){
            return next(createError(404,"Gig not found!!"))
        }
        res.status(200).send(gig)
    } catch (error) {
        next(error)
    }
    
}
export const getgigs=async(req,res,next)=>{
    const q=req.query;
    const filter={
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && {
            price: {
              ...(q.min && { $gt: q.min }),
              ...(q.max && { $lt: q.max }),
            },
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    }
    try {
        const gigs= await Gig.find(filter).sort({ [q.sort]: -1 });
            res.status(200).send(gigs)
    } catch (error) {
        next(error)
    }
}