import  express  from "express";
import { createconv, getconv, getsingleconv, updateconv } from "../controller/conversation.js";
import { verifytoken } from '../middleware/jwt.js'
const route=express.Router();
  
route.post("/",verifytoken,createconv)
route.get("/",verifytoken,getconv)
route.get("/single/:id",verifytoken,getsingleconv)
route.put("/:id",verifytoken,updateconv)

export default route; 