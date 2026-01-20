import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/auth";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
};
