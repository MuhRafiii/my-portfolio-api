import { Request, Response } from "express";
import { AppError } from "../errors/appError";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/projects";

export const handleGetProjects = async (req: Request, res: Response) => {
  try {
    const projects = await getProjects();

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (error) {
    if (error instanceof AppError) {
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

export const handleCreateProject = async (req: Request, res: Response) => {
  try {
    const { name, description, tech, github, demo } = req.body;
    const file = req.file;
    if (!name || !description || !tech || !file) {
      throw new AppError("Please fill in all required fields", 400);
    }

    const techArray = Array.isArray(tech) ? tech : [tech];
    const project = await createProject(
      name,
      description,
      techArray,
      github,
      demo,
      file
    );

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    if (error instanceof AppError) {
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

export const handleUpdateProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description, tech, github, demo } = req.body;
    const file = req.file;

    const techArray =
      tech === undefined ? undefined : Array.isArray(tech) ? tech : [tech];
    const project = await updateProject(
      id,
      name,
      description,
      techArray,
      github,
      demo,
      file
    );

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    if (error instanceof AppError) {
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

export const handleDeleteProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const project = await deleteProject(id);

    res.status(200).json({
      code: 200,
      status: "success",
      message: `${project.name} deleted successfully from projects`,
    });
  } catch (error) {
    if (error instanceof AppError) {
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
