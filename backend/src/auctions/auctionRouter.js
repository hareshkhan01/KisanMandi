import express from "express";
import { createAuction,getAuctions } from "./auctionController.js";
import authenticate from "../middlewares/auth.js";

const auctionRouter = express.Router();

auctionRouter.post("/create",authenticate, createAuction)
auctionRouter.get("/", getAuctions)
auctionRouter.put("/update/:id", updateAuction)

export default auctionRouter