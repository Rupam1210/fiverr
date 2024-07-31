import  express  from "express";
import { verifytoken } from "../middleware/jwt.js";
import { creategig, deletegig, getgig, getgigs } from "../controller/gig.controller.js";
const router=express.Router();

router.post("/",verifytoken,creategig)
router.delete("/:id",verifytoken,deletegig)
router.get("/single/:id",getgig)
router.get("/",getgigs)


export default router;