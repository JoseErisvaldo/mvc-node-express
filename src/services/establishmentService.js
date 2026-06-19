import EstablishmentModel from "../models/establishmentModel.js";

class EstablishmentService {
  async list(userId) {
    return await EstablishmentModel.findAll(userId);
  }

  async getById(id, userId) {
    const establishment = await EstablishmentModel.findById(id, userId);

    if (!establishment) {
      throw new Error("Establishment not found");
    }

    return establishment;
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

  async update(id, data, userId) {
    const establishment = await EstablishmentModel.update(id, data, userId);

    if (!establishment) {
      throw new Error("Establishment not found");
    }

    return establishment;
  }

  async remove(id, userId) {
    const deleted = await EstablishmentModel.delete(id, userId);

    if (!deleted) {
      throw new Error("Establishment not found");
    }

    return deleted;
  }
}

export default new EstablishmentService();
