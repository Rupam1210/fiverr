import  express  from "express";
import { verifytoken } from "../middleware/jwt.js";
import { createreview, deletereview, getreview } from "../controller/review.controler.js";
const route=express.Router();
route.post("/",verifytoken,createreview)
route.get("/:gigId",getreview)
route.delete("/:id",deletereview)


export default route;