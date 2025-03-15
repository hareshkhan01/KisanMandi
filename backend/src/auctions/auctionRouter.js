import express from "express";
import { createAuction,getAuctions, updateAuction } from "./auctionController.js";

const auctionRouter = express.Router();

auctionRouter.post("/create", createAuction)
auctionRouter.get("/", getAuctions)
auctionRouter.put("/update/:id", updateAuction)

export default auctionRouter