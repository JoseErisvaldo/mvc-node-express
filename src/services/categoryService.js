import CategoryModel from "../models/categoryModel.js";

class CategoryService {
  async list(userId) {
    return await CategoryModel.findAll(userId);
  }

  async getById(id) {
    return await CategoryModel.findById(id);
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

  async update(id, data) {
    return await CategoryModel.update(id, data);
  }

  async remove(id) {
    return await CategoryModel.delete(id);
  }
}

export default new CategoryService();
