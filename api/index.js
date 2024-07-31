 
import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors'
import userroute from './routes/User.route.js'
import gigroute from './routes/gig.route.js'
import messageroute from './routes/message.route.js'
import orderroute from './routes/order.route.js'
import routconversatione from './routes/conversation.route.js'
import reviewroute from './routes/review.route.js'
import authroute from './routes/auth.route.js'
dotenv.config()
const app=express();
mongoose.set("strictQuery", true); 
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//Routes
app.use("/api/auth",authroute)
app.use("/api/user",userroute)
app.use("/api/gigs",gigroute)
app.use("/api/orders",orderroute)
app.use("/api/message",messageroute)
app.use("/api/conversation",routconversatione)
app.use("/api/review",reviewroute)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
  });



app.listen(8800,()=>{
    console.log("backend is running")
    connectdb()  
})
const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected")
    } catch (error) { 
        console.log(error)
    }
}
