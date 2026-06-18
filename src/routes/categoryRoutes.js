import { Router } from "express";
import CategoryController from "../controllers/categoryController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/categories", auth, (req, res) =>
  CategoryController.list(req, res),
);

router.get("/categories/:id", auth, (req, res) =>
  CategoryController.get(req, res),
);

router.post("/categories", auth, (req, res) =>
  CategoryController.create(req, res),
);

router.put("/categories/:id", auth, (req, res) =>
  CategoryController.update(req, res),
);

router.delete("/categories/:id", auth, (req, res) =>
  CategoryController.delete(req, res),
);

export default router;
