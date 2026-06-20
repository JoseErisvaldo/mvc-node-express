import SaleService from "../services/saleService.js";

class SaleController {
  async list(req, res) {
    try {
      const sales = await SaleService.list(req.user.id);
      return res.json(sales);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const sales = await SaleService.getById(req.params.id, req.user.id);
      res.json(sales);
    } catch (error) {
      if (error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const sales = await SaleService.create(req.body, req.user.id);
      return res.status(201).json(sales);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new SaleController();
