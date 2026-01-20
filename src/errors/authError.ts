import { AppError } from "./appError";

export class AuthError extends AppError {
  constructor(message = "Unauthorized", status = 401) {
    super(message, status);
  }
}
