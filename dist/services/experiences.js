"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperiences = void 0;
const prisma_1 = require("../clients/prisma");
const appError_1 = require("../errors/appError");
const cloudinary_1 = require("./cloudinary");
const getExperiences = async () => {
    const experiences = await prisma_1.prisma.experiences.findMany({
        orderBy: {
            created_at: "asc",
        },
    });
    if (!experiences) {
        throw new appError_1.AppError("No experiences found", 404);
    }
    return experiences;
};
exports.getExperiences = getExperiences;
const createExperience = async (position, company, jobdesk, tech, start_month, start_year, end_month, end_year, file) => {
    const { url, publicId } = await (0, cloudinary_1.uploadImage)(file, "portfolio/experiences");
    const experience = await prisma_1.prisma.experiences.create({
        data: {
            position,
            company,
            jobdesk,
            tech,
            start_month,
            start_year,
            end_month,
            end_year,
            logo: url,
            logoPublicId: publicId,
        },
    });
    return experience;
};
exports.createExperience = createExperience;
const updateExperience = async (id, position, company, jobdesk, tech, start_month, start_year, end_month, end_year, file) => {
    const experience = await prisma_1.prisma.experiences.findUnique({ where: { id } });
    if (!experience) {
        throw new appError_1.AppError("Experience not found", 404);
    }
    let logo = experience.logo;
    let logoPublicId = experience.logoPublicId;
    if (file) {
        if (logoPublicId) {
            (0, cloudinary_1.deleteImage)(experience.logoPublicId);
        }
        const { url, publicId } = await (0, cloudinary_1.uploadImage)(file, "portfolio/experiences");
        logo = url;
        logoPublicId = publicId;
    }
    const updatedExperience = await prisma_1.prisma.experiences.update({
        where: { id },
        data: {
            position,
            company,
            jobdesk,
            tech,
            start_month,
            start_year,
            end_month,
            end_year,
            logo,
            logoPublicId,
        },
    });
    return updatedExperience;
};
exports.updateExperience = updateExperience;
const deleteExperience = async (id) => {
    const experience = await prisma_1.prisma.experiences.findUnique({ where: { id } });
    if (!experience) {
        throw new appError_1.AppError("Experience not found", 404);
    }
    if (experience.logoPublicId) {
        (0, cloudinary_1.deleteImage)(experience.logoPublicId);
    }
    const deletedExperience = await prisma_1.prisma.experiences.delete({ where: { id } });
    return deletedExperience;
};
exports.deleteExperience = deleteExperience;
