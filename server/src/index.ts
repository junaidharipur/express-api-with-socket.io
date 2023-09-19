import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import socketIO from "socket.io";
import { Server as HTTPServer } from "http";

import { GlobalSettings } from "./utils/GlobalSettings";
import { app } from "./app";

const httpServer = new HTTPServer(app);

mongoose
  .connect(GlobalSettings.database.connection_string)
  .then(() => {
    httpServer.listen(GlobalSettings.app.port, () => {
      const appIO = new socketIO.Server(httpServer);

      console.log("API SERVER IS LISTENING ON PORT ", GlobalSettings.app.port);
      console.log("APP VERSION: 1.1");

      //   AppIOManager.init(appIO);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection Error:`, error);
    process.exit(1);
  });
