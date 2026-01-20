"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteTech = exports.handleUpdateTech = exports.handleCreateTech = exports.handleGetTechs = void 0;
const appError_1 = require("../errors/appError");
const techs_1 = require("../services/techs");
const handleGetTechs = async (req, res) => {
    try {
        const techs = await (0, techs_1.getTechs)();
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Techs retrieved successfully",
            techs,
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
exports.handleGetTechs = handleGetTechs;
const handleCreateTech = async (req, res) => {
    try {
        const { name } = req.body;
        const file = req.file;
        if (!name || !file) {
            throw new appError_1.AppError("All fields are required", 400);
        }
        const tech = await (0, techs_1.createTech)(name, file);
        res.status(201).json({
            code: 201,
            status: "success",
            message: "Tech created successfully",
            tech,
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
exports.handleCreateTech = handleCreateTech;
const handleUpdateTech = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const tech = await (0, techs_1.updateTech)(Number(id), name, req.file);
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Tech updated successfully",
            tech,
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
exports.handleUpdateTech = handleUpdateTech;
const handleDeleteTech = async (req, res) => {
    try {
        const id = req.params.id;
        const tech = await (0, techs_1.deleteTech)(Number(id));
        res.status(200).json({
            code: 200,
            status: "success",
            messasge: `${tech.name} deleted successfully from techs`,
        });
    }
    catch (error) {
        if (error instanceof appError_1.AppError) {
            res.status(error.status).json({
                code: error.status,
                status: "error",
                message: error.message,
            });
            res.status(500).json({
                code: 500,
                status: "error",
                message: "Internal server error",
            });
        }
    }
};
exports.handleDeleteTech = handleDeleteTech;
