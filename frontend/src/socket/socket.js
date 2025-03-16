import { io } from "socket.io-client";

const socket=io("http://localhost:3300");


export const socketConnect=()=>{
    socket.on("connect", () => {
        console.log("Connected to server");
     });
}

export default socket