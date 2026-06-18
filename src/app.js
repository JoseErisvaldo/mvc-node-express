import express from "express";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import establishmentRoutes from "./routes/establishmentRoutes.js";
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use(categoryRoutes);
app.use(establishmentRoutes);

export default app;
