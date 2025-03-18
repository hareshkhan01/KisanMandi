import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

// Custom Hook for Socket Connection
export const useSocket = () => {
    const socket = useMemo(() => io(import.meta.env.VITE_API_URL, {
        reconnection: true, // Auto-reconnect
        reconnectionAttempts: 5, // Retry 5 times
        transports: ['websocket'] // Use WebSocket for better performance
    }), []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("connect_error", (err) => {
            console.error("Connection Error:", err);
        });

        // return () => {
        //     socket.disconnect(); // Cleanup on unmount
        // };
    }, [socket]);

    return socket;
};

// Function to place a bid
export const placeBid = (socket, auctionId, bidAmount, userId) => {
    if (!socket || !socket.connected) {
        console.error("Socket not connected!");
        return;
    }
    socket.emit("placeBid", { auctionId, bidAmount, userId });
};

// Function to listen for bid updates
export const updateBid = (socket, callback) => {
    if (!socket) return;
    socket.off("bidUpdate"); // Remove old listeners
    socket.on("bidUpdate", callback);
};
