"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../clients/prisma");
const authError_1 = require("../errors/authError");
const jwt_1 = require("../utils/jwt");
const login = async (username, password) => {
    if (!username || !password) {
        throw new authError_1.AuthError("Username and password are required", 400);
    }
    const admin = await prisma_1.prisma.admin.findUnique({
        where: { username },
    });
    if (!admin) {
        throw new authError_1.AuthError("Invalid username or password", 401);
    }
    const isMatch = await bcrypt_1.default.compare(password, admin.password);
    if (!isMatch) {
        throw new authError_1.AuthError("Invalid username or password", 401);
    }
    const token = (0, jwt_1.signToken)({ id: admin.id, username: admin.username });
    return {
        admin_id: admin.id,
        username: admin.username,
        token,
    };
};
exports.login = login;
