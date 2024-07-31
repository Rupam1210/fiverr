import Message from '../models/message.js'
import Conversation from '../models/Conversation.model.js'
export const newmsg=async(req,res,next)=>{
    const newMessage=new Message({
        conversationId:req.body.conversationId,
        userId:req.userId,
        desc:req.body.desc
    })
    try {
        const saved=newMessage.save();
        await Conversation.findOneAndUpdate({
            id:req.body.conversationId
        },{
            $set:{ 
                readBySeller:req.isSeller,
                readByBuyer:!req.isSeller,
                lastMessage:req.body.desc
            }
        },{new:true})
        res.status(201).send(saved);
    } catch (error) {
        next(error)
    }
}
export const getmsg=async(req,res,next)=>{
    try {
        const msg=await Message.find({conversationId:req.params.id});
        res.status(200).send(msg)
    } catch (error) {
        next(error)
    }
    
} 