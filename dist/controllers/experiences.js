"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteExperience = exports.handleUpdateExperience = exports.handleCreateExperience = exports.handleGetExperiences = void 0;
const appError_1 = require("../errors/appError");
const experiences_1 = require("../services/experiences");
const handleGetExperiences = async (req, res) => {
    try {
        const experiences = await (0, experiences_1.getExperiences)();
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Experiences retrieved successfully",
            experiences,
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
exports.handleGetExperiences = handleGetExperiences;
const handleCreateExperience = async (req, res) => {
    try {
        const { position, company, jobdesk, tech, start_month, start_year, end_month, end_year, } = req.body;
        const file = req.file;
        if (!position ||
            !company ||
            !jobdesk ||
            !tech ||
            !start_month ||
            !start_year ||
            !file) {
            throw new appError_1.AppError("Please fill in all required fields", 400);
        }
        const jobdeskArray = Array.isArray(jobdesk) ? jobdesk : [jobdesk];
        const techArray = Array.isArray(tech) ? tech : [tech];
        const experience = await (0, experiences_1.createExperience)(position, company, jobdeskArray, techArray, start_month, Number(start_year), end_month, Number(end_year), file);
        res.status(201).json({
            code: 201,
            status: "success",
            message: "Experience created successfully",
            experience,
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
exports.handleCreateExperience = handleCreateExperience;
const handleUpdateExperience = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { position, company, jobdesk, tech, start_month, start_year, end_month, end_year, } = req.body;
        const file = req.file;
        const jobdeskArray = jobdesk === undefined
            ? undefined
            : Array.isArray(jobdesk)
                ? jobdesk
                : [jobdesk];
        const techArray = tech === undefined ? undefined : Array.isArray(tech) ? tech : [tech];
        const experience = await (0, experiences_1.updateExperience)(id, position, company, jobdeskArray, techArray, start_month, start_year ? Number(start_year) : undefined, end_month, end_year ? Number(end_year) : undefined, file);
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Experience updated successfully",
            experience,
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
exports.handleUpdateExperience = handleUpdateExperience;
const handleDeleteExperience = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const experience = await (0, experiences_1.deleteExperience)(id);
        res.status(200).json({
            code: 200,
            status: "success",
            message: `Experience as ${experience.position} in ${experience.company} deleted successfully`,
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
exports.handleDeleteExperience = handleDeleteExperience;
