"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const uploadImage = async (file, folder) => {
    const result = await cloudinary_1.default.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, { folder });
    return {
        url: result.secure_url,
        publicId: result.public_id,
    };
};
exports.uploadImage = uploadImage;
const deleteImage = async (publicId) => {
    await cloudinary_1.default.uploader.destroy(publicId);
};
exports.deleteImage = deleteImage;
