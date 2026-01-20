import { Request } from "express";

export interface AuthPayload {
  id: number;
  username: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}
