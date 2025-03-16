import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum:[],
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
  quality: {
    type: String,
    enum:["grade-a","grade-b","grade-c","Certified Organic", "Natural"],
    default:"Natural",
    required: true,
  },

  unit: {
    type: String,
    enum:["kg","litre","pounds"],
    default: "kg",
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

  duration  : {
    type: Number,
    required: true
  },
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
