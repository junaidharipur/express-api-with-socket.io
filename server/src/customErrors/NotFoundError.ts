import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  public statusCode = 404;

  constructor() {
    super("NotFoundError");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return { message: "Not Found!" };
  }
}
