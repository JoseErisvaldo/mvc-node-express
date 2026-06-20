import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import ProductController from "../controllers/productController.js";

const router = Router();

router.get("/products", auth, (req, res) => {
  return ProductController.list(req, res);
});

router.get("/products/:id", auth, (req, res) => {
  return ProductController.get(req, res);
});

router.post("/products", auth, (req, res) => {
  return ProductController.create(req, res);
});

router.put("/products/:id", auth, (req, res) => {
  return ProductController.update(req, res);
});

router.delete("/products/:id", auth, (req, res) => {
  return ProductController.delete(req, res);
});

export default router;
