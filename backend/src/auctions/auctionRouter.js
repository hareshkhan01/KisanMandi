import express from "express";
import { createAuction,getAuctions,isOwner,updateAuction,getAuctionById } from "./auctionController.js";
import authenticate from "../middlewares/auth.js";

const auctionRouter = express.Router();

auctionRouter.post("/create",authenticate, createAuction)
auctionRouter.get("/",authenticate, getAuctions)
auctionRouter.put("/update/:id",authenticate,isOwner, updateAuction)
auctionRouter.get('/:id',authenticate, getAuctionById)
export default auctionRouter