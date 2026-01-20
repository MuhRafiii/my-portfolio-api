import { NextFunction, Response } from "express";
import { AuthError } from "../errors/authError";
import { AuthRequest } from "../types/auth";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new AuthError("Unauthorized", 401);
    }

    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      status: "error",
      message: "Invalid or expired token",
    });
  }
};
