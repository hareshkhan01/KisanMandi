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
        const { bidAmount, userId } = req.body;

        // Fetch the auction
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        // Push the new bid into highestBidders array
        auction.highestBidder.push({
            user: userId,
            amount: bidAmount,
            bidTime: new Date()
        });

        // Sort bids in descending order & keep only the top 3
        auction.highestBidder.sort((a, b) => b.amount - a.amount);
        if (auction.highestBidder.length > 3) {
            auction.highestBidder = auction.highestBidders.slice(0, 3);
        }

        // Update currentBid (highest bid)
        auction.currentBid = auction.highestBidder[0].amount;

        // Save the updated auction
        await auction.save();

        res.json(auction);
    } catch (error) {
        next(error);
    }
}


export { createAuction,getAuctions, updateAuction }