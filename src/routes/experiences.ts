import express from "express";
import {
  handleCreateExperience,
  handleDeleteExperience,
  handleGetExperiences,
  handleUpdateExperience,
} from "../controllers/experiences";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.get("/", handleGetExperiences);
router.post("/", authMiddleware, upload.single("logo"), handleCreateExperience);
router.put(
  "/:id",
  authMiddleware,
  upload.single("logo"),
  handleUpdateExperience
);
router.delete("/:id", authMiddleware, handleDeleteExperience);

export default router;
