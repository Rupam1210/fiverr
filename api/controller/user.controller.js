import User from "../models/usermodal.js";

export const deleteuser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(req.userId!=user._id.toString()){
        return res.status(403).send("You can Delete your account only")
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted");
    
}
export const getuser=async(req,res)=>{
     const user =await User.findById(req.params.id)
     res.status(200).send(user)
}