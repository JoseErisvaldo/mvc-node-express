// services/ProductService.js

import ProductModel from "../models/productModel.js";
import EstablishmentModel from "../models/establishmentModel.js";
import {
  ensureProductExists,
  ensureRequiredFields,
  ensureValidDimensions,
  ensureImmutableFields,
} from "../validators/productValidator.js";
import { ensureEstablishmentOwnership } from "../validators/generic.js";
class ProductService {
  async list(userId) {
    return await ProductModel.findAll(userId);
  }

  async getById(id, userId) {
    const product = await ProductModel.findById(id, userId);
    ensureProductExists(product);
    return product;
  }

  async create(data, userId) {
    ensureRequiredFields(data);
    ensureValidDimensions(data.dimensions);

    const establishment = await EstablishmentModel.findById(
      data.establishment_id,
      userId,
    );

    ensureEstablishmentOwnership(establishment);

    const { data: product, error } = await ProductModel.create({
      ...data,
      user_id: userId,
    });

    if (error) {
      throw error;
    }

    return product;
  }

  async update(id, data, userId) {
    const product = await ProductModel.findById(id, userId);

    ensureProductExists(product);
    ensureImmutableFields(data);

    const { data: updatedProduct, error } = await ProductModel.update(
      id,
      data,
      userId,
    );

    if (error) {
      throw error;
    }

    return updatedProduct;
  }

  async delete(id, userId) {
    const product = await ProductModel.findById(id, userId);

    ensureProductExists(product);

    const { data: deletedProduct, error } = await ProductModel.delete(
      id,
      userId,
    );

    if (error) {
      throw error;
    }

    return deletedProduct;
  }
}

export default new ProductService();
