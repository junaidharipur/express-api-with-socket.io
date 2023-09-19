import express from "express";
import cors from "cors";
import { NotFoundError } from "./customErrors/NotFoundError";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import { apiV1Router } from "./services/allRoutes";

export const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "500kb",
  })
);

app.use("/api/v1", apiV1Router);

app.use("*", () => {
  throw new NotFoundError();
});

app.use(ErrorHandler);
