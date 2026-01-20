"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const appError_1 = require("./appError");
class AuthError extends appError_1.AppError {
    constructor(message = "Unauthorized", status = 401) {
        super(message, status);
    }
}
exports.AuthError = AuthError;
