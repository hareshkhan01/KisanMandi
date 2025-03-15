import express from "express";
import {config} from "./src/config/config.js"
import app from "./src/app.js"
import connectDB from "./src/config/db.js";
// const port = config.port;

const startServer = async () => {

    await connectDB();

      const PORT = config.port || 3000;
  
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
  }
  
  startServer();