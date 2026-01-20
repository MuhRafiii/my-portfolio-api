import { Request, Response } from "express";
import { AppError } from "../errors/appError";
import { getProfile, updateProfile } from "../services/profile";

export const handleGetProfile = async (req: Request, res: Response) => {
  try {
    const profile = await getProfile();

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Profile retrieved successfully",
      data: profile,
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

export const handleUpdateProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const file = req.file;
    const updatedProfile = await updateProfile(data, file);

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Profile updated successfully",
      data: updatedProfile,
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
