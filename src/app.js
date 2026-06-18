import express from "express";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use(categoryRoutes);
app.use("/auth", authRoutes);

export default app;
