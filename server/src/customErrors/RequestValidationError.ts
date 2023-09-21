import { AppError } from "./AppError";
import { ValidationError } from "express-validator";

export class RequestValidationError extends AppError {
  public statusCode = 400;
  private errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super("RequestValidationError");

    this.errors = errors;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return {
      message: "Validation Error!",
      errors: this.errors.map((err) => {
        if (err.type === "field") {
          return { reason: err.msg, field: err.path };
        }

        return { reason: err.msg };
      }),
    };
  }
}
