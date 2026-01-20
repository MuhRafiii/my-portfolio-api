"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authError_1 = require("../errors/authError");
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            throw new authError_1.AuthError("Unauthorized", 401);
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            code: 401,
            status: "error",
            message: "Invalid or expired token",
        });
    }
};
exports.authMiddleware = authMiddleware;
