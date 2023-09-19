interface IStandardError {
  message: string;
}

export abstract class AppError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
  }

  abstract statusCode: number;

  abstract serializeError(): IStandardError;
}
