import { useMemo } from "react";
import { io } from "socket.io-client";
import {config} from "../../../backend/src/config/config.js";
const socket=io(`http://localhost:3300`);


export const socketConnect=()=>{
    socket.on("connect", () => {
        console.log("Connected to server");
     });
}

export const placeBid = async (auctionId, bidAmount, userId) => {
    socket.emit('placeBid', { auctionId, bidAmount, userId });
}

export const updateBid = async (auctionId, bidAmount, userId) => {
    socket.emit('bidUpdate', { auctionId, bidAmount, userId });
}

export default socket