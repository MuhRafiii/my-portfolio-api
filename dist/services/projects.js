"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const prisma_1 = require("../clients/prisma");
const appError_1 = require("../errors/appError");
const cloudinary_1 = require("./cloudinary");
const getProjects = async () => {
    const projcets = await prisma_1.prisma.projects.findMany({
        orderBy: {
            created_at: "asc",
        },
    });
    return projcets;
};
exports.getProjects = getProjects;
const createProject = async (name, description, tech, github, demo, file) => {
    const { url, publicId } = await (0, cloudinary_1.uploadImage)(file, "portfolio/projects");
    const project = await prisma_1.prisma.projects.create({
        data: {
            name,
            description,
            tech,
            github,
            demo,
            image: url,
            imagePublicId: publicId,
        },
    });
    return project;
};
exports.createProject = createProject;
const updateProject = async (id, name, description, tech, github, demo, file) => {
    const project = await prisma_1.prisma.projects.findUnique({ where: { id } });
    if (!project) {
        throw new appError_1.AppError("Project not found", 404);
    }
    let image = project.image;
    let imagePublicId = project.imagePublicId;
    if (file) {
        if (imagePublicId) {
            (0, cloudinary_1.deleteImage)(imagePublicId);
        }
        const { url, publicId } = await (0, cloudinary_1.uploadImage)(file, "portfolio/projects");
        image = url;
        imagePublicId = publicId;
    }
    const updatedProject = await prisma_1.prisma.projects.update({
        where: { id },
        data: {
            name,
            description,
            tech,
            github,
            demo,
            image,
            imagePublicId,
        },
    });
    return updatedProject;
};
exports.updateProject = updateProject;
const deleteProject = async (id) => {
    const project = await prisma_1.prisma.projects.findUnique({ where: { id } });
    if (!project) {
        throw new appError_1.AppError("Project not found", 404);
    }
    if (project.imagePublicId) {
        (0, cloudinary_1.deleteImage)(project.imagePublicId);
    }
    const deletedProject = await prisma_1.prisma.projects.delete({ where: { id } });
    return deletedProject;
};
exports.deleteProject = deleteProject;
