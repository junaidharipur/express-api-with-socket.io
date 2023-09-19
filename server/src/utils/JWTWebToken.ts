import jwt from "jsonwebtoken";
import { GlobalSettings } from "./GlobalSettings";

export class JsonWebToken {
  static generateToken(data: any): string {
    return jwt.sign(data, GlobalSettings.app.jwtSecret, { expiresIn: "24h" });
  }
  static decodeToken(token: string): any {
    return jwt.verify(token, GlobalSettings.app.jwtSecret);
  }
  static getTokenExpirationTime(token: string) {
    const resp = jwt.verify(token, GlobalSettings.app.jwtSecret) as
      | { exp: number }
      | undefined;
    if (resp) return resp.exp;
  }
}
