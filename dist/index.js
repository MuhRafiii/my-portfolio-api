"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = require("./middlewares/cors");
const auth_1 = __importDefault(require("./routes/auth"));
const experiences_1 = __importDefault(require("./routes/experiences"));
const profile_1 = __importDefault(require("./routes/profile"));
const projects_1 = __importDefault(require("./routes/projects"));
const techs_1 = __importDefault(require("./routes/techs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(cors_1.corsMiddleware);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_1.default);
app.use("/profile", profile_1.default);
app.use("/techs", techs_1.default);
app.use("/experiences", experiences_1.default);
app.use("/projects", projects_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
