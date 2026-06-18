import EstablishmentModel from "../models/establishmentModel.js";

class EstablishmentService {
  async list(userId) {
    return await EstablishmentModel.findAll(userId);
  }

  async getById(id) {
    return await EstablishmentModel.findById(id);
  }

  async create(data, userId) {
    if (!data.name) {
      throw new Error("Name is required");
    }

    return await EstablishmentModel.create({
      ...data,
      user_id: userId,
    });
  }

  async update(id, data) {
    return await EstablishmentModel.update(id, data);
  }

  async remove(id) {
    return await EstablishmentModel.delete(id);
  }
}

export default new EstablishmentService();
