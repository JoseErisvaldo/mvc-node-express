import ProductService from "../services/productService.js";
class ProductController {
  async list(req, res) {
    try {
      const products = await ProductService.list(req.user.id);
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const product = await ProductService.getById(req.params.id, req.user.id);
      return res.json(product);
    } catch (error) {
      if (error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const product = await ProductService.create(req.body, req.user.id);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const product = await ProductService.update(
        req.params.id,
        req.body,
        req.user.id,
      );
      console.log(product);
      return res.json(product);
    } catch (error) {
      if (error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const product = await ProductService.delete(req.params.id, req.user.id);
      return res.json(product);
    } catch (error) {
      if (error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ProductController();
