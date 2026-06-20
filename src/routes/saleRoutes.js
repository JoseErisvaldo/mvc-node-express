import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import SaleController from "../controllers/saleController.js";

const router = Router();

router.get("/sales", auth, (req, res) => {
  return SaleController.list(req, res);
});

router.get("/sales/:id", auth, (req, res) => {
  return SaleController.get(req, res);
});

router.post("/sales", auth, (req, res) => {
  return SaleController.create(req, res);
});

export default router;
