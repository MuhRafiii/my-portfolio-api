"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateProfile = exports.handleGetProfile = void 0;
const appError_1 = require("../errors/appError");
const profile_1 = require("../services/profile");
const handleGetProfile = async (req, res) => {
    try {
        const profile = await (0, profile_1.getProfile)();
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Profile retrieved successfully",
            data: profile,
        });
    }
    catch (error) {
        if (error instanceof appError_1.AppError) {
            res.status(error.status).json({
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
exports.handleGetProfile = handleGetProfile;
const handleUpdateProfile = async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;
        const updatedProfile = await (0, profile_1.updateProfile)(data, file);
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Profile updated successfully",
            data: updatedProfile,
        });
    }
    catch (error) {
        if (error instanceof appError_1.AppError) {
            res.status(error.status).json({
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
exports.handleUpdateProfile = handleUpdateProfile;
