import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true,
    },
    currentBid: { 
        type: Number, 
        default: 0 
    },
     status: { 
        type: String, 
        enum: ['open', 'closed'],
        default: 'open' 
    },

    endTime: Date,

  highestBidder: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     }
});

const auctionModel = mongoose.model("Auction", auctionSchema);
export default auctionModel;