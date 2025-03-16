import express from "express";
import { createAuction,getAuctions,updateAuction } from "./auctionController.js";
import authenticate from "../middlewares/auth.js";

const auctionRouter = express.Router();

auctionRouter.post("/create",authenticate, createAuction)
auctionRouter.get("/",authenticate, getAuctions)
auctionRouter.put("/update/:id",authenticate, updateAuction)

export default auctionRouter