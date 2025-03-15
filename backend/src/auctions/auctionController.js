
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



export{createAuction, getAuctions}
