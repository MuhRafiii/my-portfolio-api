import express from "express";
import {
  handleCreateProject,
  handleDeleteProject,
  handleGetProjects,
  handleUpdateProject,
} from "../controllers/projects";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.get("/", handleGetProjects);
router.post("/", authMiddleware, upload.single("image"), handleCreateProject);
router.put("/:id", authMiddleware, upload.single("image"), handleUpdateProject);
router.delete("/:id", authMiddleware, handleDeleteProject);

export default router;
