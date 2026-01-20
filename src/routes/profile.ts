import express from "express";
import { handleGetProfile, handleUpdateProfile } from "../controllers/profile";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.get("/", handleGetProfile);
router.put("/", authMiddleware, upload.single("photo"), handleUpdateProfile);

export default router;
