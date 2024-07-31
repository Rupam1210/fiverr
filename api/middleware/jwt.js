import jwt from 'jsonwebtoken'
export const verifytoken=async(req,res,next)=>{
    const token=req.cookies.accessToken;
    if(!token)return res.status(403).send("You are not authenticated")
    jwt.verify(token,process.env.JWTKEY,async(err,payload)=>{
if(err)return res.status(403).send("Token is not valid!")
req.userId=payload.id,
req.isSeller=payload.isSeller;
next()
})
}