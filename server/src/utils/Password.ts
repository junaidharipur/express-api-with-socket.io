import { scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class PasswordManager {
  static async hashPassword(password: string) {
    const hashedPwd = (await scryptAsync(password, "", 1)) as Buffer;
    return hashedPwd.toString();
  }

  static async comparePassword(password: string, inputHash: string) {
    const currentHash = (await scryptAsync(password, "", 1)) as Buffer;
    return currentHash.toString() === inputHash;
  }
}
