import  express  from "express";
import { verifytoken } from "../middleware/jwt.js";
import {   confirm, getorder, intent } from "../controller/order.controller.js";
const route=express.Router();

// route.post("/:id",verifytoken,createorder)
route.get("/",verifytoken,getorder)
route.post("/create-payment-intent/:id",verifytoken,intent)
route.put("/", verifytoken, confirm);

export default route;