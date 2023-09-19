import { Request, Response, NextFunction } from "express";
import { AuthManager } from "./manager";

export class AuthRouteHandler {
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await new AuthManager().loginUser(req.body);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createNewAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await new AuthManager().createNewAccount(req.body);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
