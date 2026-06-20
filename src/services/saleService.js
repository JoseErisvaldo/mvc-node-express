import establishmentModel from "../models/establishmentModel.js";
import SaleModel from "../models/saleModel.js";
import { ensureEstablishmentOwnership } from "../validators/generic.js";

class SaleService {
  async list(userId) {
    const sales = await SaleModel.list(userId);

    return sales;
  }

  async getById(id, userId) {
    const sales = await SaleModel.findById(id, userId);

    return sales;
  }

  async create(data, userId) {
    const establishment = await establishmentModel.findById(
      data.establishment_id,
      userId,
    );
    if (!establishment) {
      throw new Error("Invalid establishment for this user");
    }
    const { data: sales, error } = await SaleModel.create({
      ...data,
      user_id: userId,
    });

    if (error) {
      throw error;
    }

    return sales;
  }
}

export default new SaleService();
