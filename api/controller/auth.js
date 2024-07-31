import User from '../models/usermodal.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register=async(req,res)=>{
  try {
    const hash=bcrypt.hashSync(req.body.password,10);
    const newuser = new User({
       ...req.body,
       password:hash,  
    });
    await newuser.save();
    
    res.status(201).send("User has been created");
    
  } catch (error) {
    res.status(500).send("Something Went Wrong")
    console.log(error)
  }
    
}
export const login=async(req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username});
        if(!user){
          return res.status(404).send("User is not found")
        }
        const iscorrect =await bcrypt.compareSync(req.body.password,user.password);
        if(!iscorrect) return res.status(400).send("Wrong Password or name")
        const token=jwt.sign({
      id:user._id,
      isSeller:user.isSeller,
      },
      process.env.JWTKEY)
        const {password, ...info} =user._doc;
      res.cookie("accessToken",token,{
        httpOnly:true,
      }).status(200).send(info)
    } catch (error) {
      res.status(500).send("Something Went Wrong")
      console.log(error)
    }
}
export const logout=async(req,res)=>{
      res.clearCookie("access token",{
        sameSite:"none",
        secure:true,
      })
      .status(200).send("User has been Logout")
        
    
}
 