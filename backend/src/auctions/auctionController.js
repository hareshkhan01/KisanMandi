import createHttpError from "http-errors";
import auctionModel from "../models/auction.js";
import userModel from "../models/user.js";
import sendSMS from "../middlewares/twilioService.js";
async function createAuction(req, res, next) {
  const {
    product,
    startingBid,
    unit,
    harverstDate,
    minBidIncrement,
    duration,
    pickupLocation,
    quantity,
    quality,
    description,
    category,
    images
  } = req.body;

  if (!product || !startingBid || !quantity) {
    return next(
      createHttpError(
        400,
        "Product name, quantity, and starting price are required"
      )
    );
  }
  console.log(req.body);
  try {
    const newAuction = await auctionModel.create({
      ...req.body,
      farmer: req.userId,
      currentBid: startingBid,
    });
    res.status(201).json(newAuction);
  } catch (error) {
    if (error.code === 11000) {
      return next(createHttpError(409, "Auction already exists"));
    }
    if (error.name === "ValidationError") {
      return next(createHttpError(400, error.message));
    }
    next(error);
  }
}

async function getAuctions(req, res, next) {
  try {
    const auctions = await auctionModel.find().populate({path: 'farmer', select: 'name'});
    console.log(auctions);
    res.json(auctions);
  } catch (error) {
    next(error);
  }
}

async function updateAuction(req, res, next) {
  try {
    const updatedAuction = await auctionModel.findByIdAndUpdate(
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

const isOwner = async (req, res, next) => {
  try {
    const auction = await auctionModel.findById(req.params.id);
    if (auction.farmer.toString() !== req.userId) {
      return next(
        createHttpError(403, "You are not the owner of this auction")
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const getAuctionById = async (req, res, next) => {
  try {
    const auction = await auctionModel.findById(req.params.id);
    if (!auction) {
      return next(createHttpError(404, "Auction not found"));
    }
    res.json(auction);
  } catch (error) {
    next(error);
  }
};

const updateAuctionStatus = async (req, res, next) => {
  try {
    const auction = await auctionModel.findById(req.params.id);

    if (!auction) {
      return next(createHttpError(404, "Auction not found"));
    }
    auction.status = req.body.status;

    await auction.save();
    console.log("Fetching farmer details...");
    const user = await userModel.findById(auction.farmer);

    if (user) {
      try {
        await sendSMS("+91" + user.phone, "BSDK Your auction has been closed");
        console.log("SMS sent successfully!");
      } catch (error) {
        console.error("Error sending SMS:", error);
      }
    } else {
      console.log("User not found, SMS not sent.");
    }

    res.json(auction);
  } catch (error) {
    console.error("Error in updateAuctionStatus:", error);
    next(error);
  }
};


const getMyAuctions = async (req, res, next) => {
  try {
    const auctions = await auctionModel.find({ farmer: req.userId });
    res.json(auctions);
  } catch (error) {
    next(error);
  }
}
export { createAuction, updateAuction, getAuctions, isOwner, getAuctionById, updateAuctionStatus, getMyAuctions };
