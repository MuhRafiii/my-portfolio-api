"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTech = exports.updateTech = exports.createTech = exports.getTechs = void 0;
const prisma_1 = require("../clients/prisma");
const appError_1 = require("../errors/appError");
const cloudinary_1 = require("./cloudinary");
const getTechs = async () => {
    const techs = await prisma_1.prisma.techs.findMany({
        orderBy: {
            created_at: "asc",
        },
    });
    return techs;
};
exports.getTechs = getTechs;
const createTech = async (name, file) => {
    const { url, publicId } = await (0, cloudinary_1.uploadImage)(file, "portfolio/techs");
    const icon = url;
    const iconPublicId = publicId;
    const tech = await prisma_1.prisma.techs.create({
        data: {
            name,
            icon,
            iconPublicId,
        },
    });
    return tech;
};
exports.createTech = createTech;
const updateTech = async (id, name, file) => {
    const tech = await prisma_1.prisma.techs.findUnique({ where: { id } });
    if (!tech) {
        throw new appError_1.AppError("Tech not found", 404);
    }
    let icon = tech.icon;
    let iconPublicId = tech.iconPublicId;
    if (file) {
        if (iconPublicId) {
            (0, cloudinary_1.deleteImage)(iconPublicId);
        }
        const { url, publicId } = await (0, cloudinary_1.uploadImage)(file, "portfolio/techs");
        icon = url;
        iconPublicId = publicId;
    }
    const updatedTech = await prisma_1.prisma.techs.update({
        where: { id },
        data: {
            name,
            icon,
            iconPublicId,
        },
    });
    return updatedTech;
};
exports.updateTech = updateTech;
const deleteTech = async (id) => {
    const tech = await prisma_1.prisma.techs.findUnique({ where: { id } });
    if (!tech) {
        throw new appError_1.AppError("Tech not found", 404);
    }
    if (tech.iconPublicId) {
        (0, cloudinary_1.deleteImage)(tech.iconPublicId);
    }
    const deletedTech = await prisma_1.prisma.techs.delete({ where: { id } });
    return deletedTech;
};
exports.deleteTech = deleteTech;
