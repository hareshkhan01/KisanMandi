import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;