import { Request, Response } from "express";
import { AppError } from "../errors/appError";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "../services/experiences";

export const handleGetExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await getExperiences();

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Experiences retrieved successfully",
      experiences,
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

export const handleCreateExperience = async (req: Request, res: Response) => {
  try {
    const {
      position,
      company,
      jobdesk,
      tech,
      start_month,
      start_year,
      end_month,
      end_year,
    } = req.body;
    const file = req.file;

    if (
      !position ||
      !company ||
      !jobdesk ||
      !tech ||
      !start_month ||
      !start_year ||
      !file
    ) {
      throw new AppError("Please fill in all required fields", 400);
    }

    const jobdeskArray = Array.isArray(jobdesk) ? jobdesk : [jobdesk];
    const techArray = Array.isArray(tech) ? tech : [tech];

    const experience = await createExperience(
      position,
      company,
      jobdeskArray,
      techArray,
      start_month,
      Number(start_year),
      end_month,
      Number(end_year),
      file
    );

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Experience created successfully",
      experience,
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

export const handleUpdateExperience = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const {
      position,
      company,
      jobdesk,
      tech,
      start_month,
      start_year,
      end_month,
      end_year,
    } = req.body;
    const file = req.file;

    const jobdeskArray =
      jobdesk === undefined
        ? undefined
        : Array.isArray(jobdesk)
        ? jobdesk
        : [jobdesk];
    const techArray =
      tech === undefined ? undefined : Array.isArray(tech) ? tech : [tech];

    const experience = await updateExperience(
      id,
      position,
      company,
      jobdeskArray,
      techArray,
      start_month,
      start_year ? Number(start_year) : undefined,
      end_month,
      end_year ? Number(end_year) : undefined,
      file
    );
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Experience updated successfully",
      experience,
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

export const handleDeleteExperience = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const experience = await deleteExperience(id);

    res.status(200).json({
      code: 200,
      status: "success",
      message: `Experience as ${experience.position} in ${experience.company} deleted successfully`,
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
