import { supabase } from "../config/supabaseClient.js";

class SaleModel {
  async list(userId) {
    const { data, error } = await supabase
      .from("sales")
      .select()
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data;
  }

  async findById(id, userId) {
    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async create(data) {
    const { data: product, error } = await supabase
      .from("sales")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    return product;
  }
}

export default new SaleModel();
