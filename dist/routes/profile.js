"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = require("../controllers/profile");
const auth_1 = require("../middlewares/auth");
const upload_1 = require("../middlewares/upload");
const router = express_1.default.Router();
router.get("/", profile_1.handleGetProfile);
router.put("/", auth_1.authMiddleware, upload_1.upload.single("photo"), profile_1.handleUpdateProfile);
exports.default = router;
