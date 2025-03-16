import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  availibility: {
    type: Boolean,
    default: false,
  },

  farmer: {

    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,

  },

  pickupLocation: {
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
