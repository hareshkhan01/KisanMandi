import express from "express";
import { config } from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupAuctionHandlers } from "./src/sockets/socketHandler.js";
// const port = config.port;

const server = createServer(app);
const io = new Server(server,{
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

setupAuctionHandlers(io);

const startServer = async () => {
  await connectDB();

  const PORT = config.port || 3000;

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
