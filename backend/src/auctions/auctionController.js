
import Auction from "../models/auction.js";
async function createAuction(req, res, next) {
    const auction = new Auction({...req.body});
    try {
        const newAuction = await Auction.create(req.body);
        res.status(201).json(newAuction);
    } catch (error) {
        next(error);
    }
}


async function getAuctions(req, res, next) {
    try {
        const auctions = await Auction.find();
        res.json(auctions);
    } catch (error) {
        next(error);
    }
}

async function updateAuction(req, res, next) {
    try {
        const updatedAuction = await Auction.findByIdAndUpdate(
            req.params.id,        
            req.body,             
            { new: true }         
        );

        if (!updatedAuction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json(updatedAuction);
    } catch (error) {
        next(error);
    }
}


export { createAuction,getAuctions, updateAuction }