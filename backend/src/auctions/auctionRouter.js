import express from "express";

const auctionRouter = express.Router();

auctionRouter.post("/create", createAuction)

export default auctionRouter