import CategoryModel from "../models/categoryModel.js";

class CategoryService {
  async list(userId) {
    return await CategoryModel.findAll(userId);
  }

  async getById(id, userId) {
    const category = await CategoryModel.findById(id, userId);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async create(data, userId) {
    if (!data.name) {
      throw new Error("Name is required");
    }

    return await CategoryModel.create({
      ...data,
      user_id: userId,
    });
  }

  async update(id, data, userId) {
    const category = await CategoryModel.update(id, data, userId);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async remove(id, userId) {
    const deleted = await CategoryModel.delete(id, userId);

    if (!deleted) {
      throw new Error("Category not found");
    }

    return deleted;
  }
}

export default new CategoryService();
