import  express  from "express";
import { verifytoken } from '../middleware/jwt.js'
import { getmsg, newmsg } from "../controller/message.controller.js";
const route=express.Router();
route.post("/",verifytoken,newmsg)
route.get("/:id",verifytoken,getmsg)


export default route;