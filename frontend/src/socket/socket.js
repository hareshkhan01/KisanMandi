import { useMemo } from "react";
import { io } from "socket.io-client";
import {config} from "../../../backend/src/config/config.js";
const socket=io(`http://localhost:${config.port}`);


export const socketConnect=()=>{
    socket.on("connect", () => {
        console.log("Connected to server");
     });
}

export const placeBid = async (auctionId, bidAmount, userId) => {
    socket.emit('placeBid', { auctionId, bidAmount, userId });
}



export default socket