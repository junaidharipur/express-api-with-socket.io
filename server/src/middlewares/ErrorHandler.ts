import { AppError } from "../customErrors/AppError";
import { Request, Response, NextFunction } from "express";

export const ErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    const errorData = error.serializeError();

    res.status(error.statusCode).json(errorData);
  } else {
    res.status(400).json({ message: error.message ?? `${error}` });
  }
};
