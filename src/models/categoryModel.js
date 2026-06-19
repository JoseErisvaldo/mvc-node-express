import { supabase } from "../config/supabaseClient.js";

class CategoryModel {
  async findAll(userId) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  }

  async findById(id, userId) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async create(payload) {
    const { data, error } = await supabase
      .from("categories")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload, userId) {
    const { data, error } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async delete(id, userId) {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select("id")
      .maybeSingle();

    if (error) throw error;

    return Boolean(data);
  }
}

export default new CategoryModel();
