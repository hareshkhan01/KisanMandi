import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  crop: {
    type: String,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },

  endTime: Date,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

  highestBidder: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      bidTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const auctionModel = mongoose.model("Auction", auctionSchema);
export default auctionModel;
