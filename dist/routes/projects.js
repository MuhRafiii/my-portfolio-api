"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projects_1 = require("../controllers/projects");
const auth_1 = require("../middlewares/auth");
const upload_1 = require("../middlewares/upload");
const router = express_1.default.Router();
router.get("/", projects_1.handleGetProjects);
router.post("/", auth_1.authMiddleware, upload_1.upload.single("image"), projects_1.handleCreateProject);
router.put("/:id", auth_1.authMiddleware, upload_1.upload.single("image"), projects_1.handleUpdateProject);
router.delete("/:id", auth_1.authMiddleware, projects_1.handleDeleteProject);
exports.default = router;
