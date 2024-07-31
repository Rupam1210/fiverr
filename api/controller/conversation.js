import createError from "../util/createerror.js"
import Conversation from "../models/Conversation.model.js"

export const createconv=async(req,res,next)=>{
  const newcon=new Conversation({
    id:req.isSeller?req.userId+req.body.to:req.body.to+req.userId,
    sellerId:req.isSeller ? req.userId : req.body.to,
    buyerId:req.isSeller ? req.body.to:req.userId,
    readByBuyer:!req.isSeller,
    readBySeller:req.isSeller
  })
  try {
    const saved=await newcon.save();
    res.status(201).send(saved);
  } catch (error) {
    next(error)
  }
}
export const getconv=async(req,res,next)=>{

    try {
        const conv=await Conversation.find(
            req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}
        ).sort({updatedAt:-1})
        res.status(200).send(conv)
    } catch (error) {
        next(error)
    } 
}
export const getsingleconv=async(req,res,next)=>{

    try {
        const conv=await Conversation.findOne(
            {id:req.params.id}
        )
        if(!conv)return next(createError(404,"Not Found!!!"))
        res.status(200).send(conv)
    } catch (error) {
        next(error) 
    }
}
export const updateconv=async(req,res,next)=>{
    try {
        const update=await Conversation.findOneAndUpdate({
            id:req.params.id}, 
            {$set:{
                ...(req.isSeller?{readBySeller:true}:{readByBuyer:true})
            }},
            {new:true}
        )
        res.status(200).send(update)
        
    } catch (error) {
        next(error)
    }
}