import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import socketIO from "socket.io";
import { Server as HTTPServer } from "http";

import { GlobalSettings } from "./utils/GlobalSettings";
import { app } from "./app";
import { AppIOManager } from "./IO";

const httpServer = new HTTPServer(app);

mongoose
  .connect(GlobalSettings.database.connection_string)
  .then(() => {
    httpServer.listen(GlobalSettings.app.port, () => {
      const appIO = new socketIO.Server(httpServer);

      console.log("API SERVER IS LISTENING ON PORT", GlobalSettings.app.port);
      console.log("APP VERSION: 1.1");

      new AppIOManager(appIO).init();
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection Error:`, error);
    process.exit(1);
  });
