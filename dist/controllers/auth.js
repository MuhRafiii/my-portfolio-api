"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const appError_1 = require("../errors/appError");
const auth_1 = require("../services/auth");
const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await (0, auth_1.login)(username, password);
        res.cookie("token", data.token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Login successful",
            data,
        });
    }
    catch (error) {
        if (error instanceof appError_1.AppError) {
            return res.status(error.status).json({
                code: error.status,
                status: "error",
                message: error.message,
            });
        }
        res.status(500).json({
            code: 500,
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.handleLogin = handleLogin;
