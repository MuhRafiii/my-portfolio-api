import express from "express";
import { handleLogin } from "../controllers/auth";

const router = express.Router();

router.post("/login", handleLogin);

export default router;
