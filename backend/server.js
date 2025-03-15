import express from "express";
import {config} from "./src/config/config.js"
import app from "./src/app.js"
// const port = config.port;

const startServer = async () => {

      const PORT = config.port || 3000;
  
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
  }
  
  startServer();