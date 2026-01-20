"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const appError_1 = require("./appError");
class ValidationError extends appError_1.AppError {
    constructor(message = "Invalid Input") {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
