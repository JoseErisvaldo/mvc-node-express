import EstablishmentService from "../services/establishmentService.js";

class EstablishmentController {
  async list(req, res) {
    try {
      const establishments = await EstablishmentService.list(req.user.id);
      return res.json(establishments);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async get(req, res) {
    try {
      const establishment = await EstablishmentService.getById(
        req.params.id,
        req.user.id,
      );
      return res.json(establishment);
    } catch (err) {
      if (err.message === "Establishment not found") {
        return res.status(404).json({ error: err.message });
      }

      return res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const establishment = await EstablishmentService.create(
        req.body,
        req.user.id,
      );
      return res.status(201).json(establishment);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const establishment = await EstablishmentService.update(
        req.params.id,
        req.body,
        req.user.id,
      );
      return res.json(establishment);
    } catch (err) {
      if (err.message === "Establishment not found") {
        return res.status(404).json({ error: err.message });
      }

      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await EstablishmentService.remove(req.params.id, req.user.id);
      return res.json({ message: "Deleted successfully" });
    } catch (err) {
      if (err.message === "Establishment not found") {
        return res.status(404).json({ error: err.message });
      }

      return res.status(400).json({ error: err.message });
    }
  }
}

export default new EstablishmentController();
