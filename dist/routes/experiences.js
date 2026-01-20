"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const experiences_1 = require("../controllers/experiences");
const auth_1 = require("../middlewares/auth");
const upload_1 = require("../middlewares/upload");
const router = express_1.default.Router();
router.get("/", experiences_1.handleGetExperiences);
router.post("/", auth_1.authMiddleware, upload_1.upload.single("logo"), experiences_1.handleCreateExperience);
router.put("/:id", auth_1.authMiddleware, upload_1.upload.single("logo"), experiences_1.handleUpdateExperience);
router.delete("/:id", auth_1.authMiddleware, experiences_1.handleDeleteExperience);
exports.default = router;
