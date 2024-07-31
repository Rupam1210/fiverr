import  express  from "express";
import { deleteuser, getuser } from "../controller/user.controller.js";
import { verifytoken } from "../middleware/jwt.js";

const route=express.Router();

route.delete("/:id",verifytoken,deleteuser)
route.get("/:id",getuser)

export default route;   