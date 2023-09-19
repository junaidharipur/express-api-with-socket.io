import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  public statusCode = 404;
  public message: string;

  constructor(message: string) {
    super("BadRequestError");

    this.message = message;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
