import { supabase } from "../config/supabaseClient.js";

class ProductModel {
  async findAll(userId) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  }

  async findById(id, userId) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async create(data) {
    const { data: product, error } = await supabase
      .from("products")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    return product;
  }

  async update(id, data, userId) {
    const { data: product, error } = await supabase
      .from("products")
      .update(data)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    return product;
  }

  async delete(id, userId) {
    const { data: product, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    return product;
  }
}

export default new ProductModel();
