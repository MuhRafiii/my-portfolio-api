import { Request, Response } from "express";
import { AppError } from "../errors/appError";
import { login } from "../services/auth";

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const data = await login(username, password);

    res.cookie("token", data.token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Login successful",
      data,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status).json({
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
