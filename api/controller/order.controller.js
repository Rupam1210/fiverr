import Gig from "../models/gig.js"
import Order from "../models/Order.js"
import createError from "../util/createerror.js"
import Stripe from 'stripe'
export const intent=async(req,res,next)=>{
  const stripe=new Stripe(process.env.STRIPE);
  const gig=await Gig.findById(req.params.id)
  const paymentIntent=await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  })
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });
  await newOrder.save();
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  })
}

 
export const getorder=async(req,res,next)=>{
    try {
       const order=await Order.find({
        ...(req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}),
           isCompleted:false  
       })
      res.status(200).send(order)
    } catch (error) {
      
      next(error)
    }
} 
export const confirm=async(req,res,next)=>{
  try {
    const orders=await Order.findOneAndUpdate({
      payment_intent:req.body.payment_intent,
    },
    {
      $set:{
        isCompleted:true
      }
    })
    res.status(200).send("Order has been confirmed.");
  } catch (error) {
    next(err)
  }
}