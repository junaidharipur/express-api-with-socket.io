import { Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";
import { RequestValidationError } from "../customErrors/RequestValidationError";

export const ValidationCheck = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      return next();
    }

    throw new RequestValidationError(validationErrors.array());
  } catch (err) {
    next(err);
  }
};
