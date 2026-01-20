import { Request, Response } from "express";
import { AppError } from "../errors/appError";
import {
  createTech,
  deleteTech,
  getTechs,
  updateTech,
} from "../services/techs";

export const handleGetTechs = async (req: Request, res: Response) => {
  try {
    const techs = await getTechs();

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Techs retrieved successfully",
      techs,
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

export const handleCreateTech = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!name || !file) {
      throw new AppError("All fields are required", 400);
    }

    const tech = await createTech(name, file);

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Tech created successfully",
      tech,
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

export const handleUpdateTech = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const tech = await updateTech(Number(id), name, req.file);

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Tech updated successfully",
      tech,
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

export const handleDeleteTech = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const tech = await deleteTech(Number(id));

    res.status(200).json({
      code: 200,
      status: "success",
      messasge: `${tech.name} deleted successfully from techs`,
    });
  } catch (error) {
    if (error instanceof AppError) {
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
