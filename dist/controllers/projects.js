"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteProject = exports.handleUpdateProject = exports.handleCreateProject = exports.handleGetProjects = void 0;
const appError_1 = require("../errors/appError");
const projects_1 = require("../services/projects");
const handleGetProjects = async (req, res) => {
    try {
        const projects = await (0, projects_1.getProjects)();
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Projects retrieved successfully",
            projects,
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
exports.handleGetProjects = handleGetProjects;
const handleCreateProject = async (req, res) => {
    try {
        const { name, description, tech, github, demo } = req.body;
        const file = req.file;
        if (!name || !description || !tech || !file) {
            throw new appError_1.AppError("Please fill in all required fields", 400);
        }
        const techArray = Array.isArray(tech) ? tech : [tech];
        const project = await (0, projects_1.createProject)(name, description, techArray, github, demo, file);
        res.status(201).json({
            code: 201,
            status: "success",
            message: "Project created successfully",
            project,
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
exports.handleCreateProject = handleCreateProject;
const handleUpdateProject = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, description, tech, github, demo } = req.body;
        const file = req.file;
        const techArray = tech === undefined ? undefined : Array.isArray(tech) ? tech : [tech];
        const project = await (0, projects_1.updateProject)(id, name, description, techArray, github, demo, file);
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Project updated successfully",
            project,
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
exports.handleUpdateProject = handleUpdateProject;
const handleDeleteProject = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const project = await (0, projects_1.deleteProject)(id);
        res.status(200).json({
            code: 200,
            status: "success",
            message: `${project.name} deleted successfully from projects`,
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
exports.handleDeleteProject = handleDeleteProject;
