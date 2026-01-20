"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const prisma_1 = require("../clients/prisma");
const appError_1 = require("../errors/appError");
const cloudinary_1 = require("./cloudinary");
const getProfile = async () => {
    const profile = await prisma_1.prisma.profile.findFirst();
    if (!profile) {
        throw new appError_1.AppError("Profile not found", 404);
    }
    return profile;
};
exports.getProfile = getProfile;
const updateProfile = async (data, file) => {
    const profile = await prisma_1.prisma.profile.findFirst();
    if (!profile) {
        throw new appError_1.AppError("Profile not found", 404);
    }
    let photo = profile.photo;
    let photoPublicId = profile.photoPublicId;
    if (file) {
        if (photoPublicId) {
            (0, cloudinary_1.deleteImage)(photoPublicId);
        }
        const { url, publicId } = await (0, cloudinary_1.uploadImage)(file, "portfolio/profile");
        photo = url;
        photoPublicId = publicId;
    }
    const updatedProfile = await prisma_1.prisma.profile.update({
        where: { id: profile.id },
        data: {
            ...data,
            photo,
            photoPublicId,
        },
    });
    return updatedProfile;
};
exports.updateProfile = updateProfile;
