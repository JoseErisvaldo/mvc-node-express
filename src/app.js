import express from "express";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import establishmentRoutes from "./routes/establishmentRoutes.js";
import product from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use(categoryRoutes);
app.use(establishmentRoutes);
app.use(product);

export default app;
