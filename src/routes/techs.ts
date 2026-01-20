import express from "express";
import {
  handleCreateTech,
  handleDeleteTech,
  handleGetTechs,
  handleUpdateTech,
} from "../controllers/techs";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.get("/", handleGetTechs);
router.post("/", authMiddleware, upload.single("icon"), handleCreateTech);
router.put("/:id", authMiddleware, upload.single("icon"), handleUpdateTech);
router.delete("/:id", authMiddleware, handleDeleteTech);

export default router;
