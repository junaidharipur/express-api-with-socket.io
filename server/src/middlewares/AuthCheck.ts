import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../customErrors/BadRequestError";
import { AuthManager } from "../services/auth/manager";

export const AuthCheck = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers ? req.headers["authorization"] || "" : "";
    if (token.length < 10) throw new BadRequestError("No Token Provided!");

    (req as any).user = await new AuthManager().verifyUserToken(token);
    next();
  } catch (err) {
    next(err);
  }
};
