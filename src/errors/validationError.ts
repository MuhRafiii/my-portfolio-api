import { AppError } from "./appError";

export class ValidationError extends AppError {
  constructor(message = "Invalid Input") {
    super(message, 400);
  }
}
