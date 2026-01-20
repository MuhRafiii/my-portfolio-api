"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const techs_1 = require("../controllers/techs");
const auth_1 = require("../middlewares/auth");
const upload_1 = require("../middlewares/upload");
const router = express_1.default.Router();
router.get("/", techs_1.handleGetTechs);
router.post("/", auth_1.authMiddleware, upload_1.upload.single("icon"), techs_1.handleCreateTech);
router.put("/:id", auth_1.authMiddleware, upload_1.upload.single("icon"), techs_1.handleUpdateTech);
router.delete("/:id", auth_1.authMiddleware, techs_1.handleDeleteTech);
exports.default = router;
