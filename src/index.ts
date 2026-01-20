import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import authRoutes from "./routes/auth";
import experienceRoutes from "./routes/experiences";
import profileRoutes from "./routes/profile";
import projectRoutes from "./routes/projects";
import techRoutes from "./routes/techs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/techs", techRoutes);
app.use("/experiences", experienceRoutes);
app.use("/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
