import { Router } from "express";
import EstablishmentController from "../controllers/establishmentController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/establishments", auth, (req, res) =>
  EstablishmentController.list(req, res),
);

router.get("/establishments/:id", auth, (req, res) =>
  EstablishmentController.get(req, res),
);

router.post("/establishments", auth, (req, res) =>
  EstablishmentController.create(req, res),
);

router.put("/establishments/:id", auth, (req, res) =>
  EstablishmentController.update(req, res),
);

router.delete("/establishments/:id", auth, (req, res) =>
  EstablishmentController.delete(req, res),
);

export default router;
