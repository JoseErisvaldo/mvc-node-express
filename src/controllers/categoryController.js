import CategoryService from "../services/categoryService.js";

class CategoryController {
  async list(req, res) {
    try {
      const categories = await CategoryService.list(req.user.id);
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async get(req, res) {
    try {
      const category = await CategoryService.getById(req.params.id);
      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const category = await CategoryService.create(req.body, req.user.id);
      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const category = await CategoryService.update(req.params.id, req.body);
      return res.json(category);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await CategoryService.remove(req.params.id);
      return res.json({ message: "Deleted successfully" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new CategoryController();
