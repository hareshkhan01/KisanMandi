import { useMemo } from "react";
import { io } from "socket.io-client";

const socket=io("http://localhost:8000")


export const socketConnect=()=>{
    socket.on("connect", () => {
        console.log("Connected to server");
     });
}

export const placeBid = async (auctionId, bidAmount, userId) => {
    socket.emit('placeBid', { auctionId, bidAmount, userId });
}



export default socket