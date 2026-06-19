import { supabase } from "../config/supabaseClient.js";

class EstablishmentModel {
  async findAll(userId) {
    const { data, error } = await supabase
      .from("establishments")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  }

  async findById(id, userId) {
    const { data, error } = await supabase
      .from("establishments")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async create(payload) {
    const { data, error } = await supabase
      .from("establishments")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload, userId) {
    const { data, error } = await supabase
      .from("establishments")
      .update(payload)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async delete(id, userId) {
    const { data, error } = await supabase
      .from("establishments")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select("id")
      .maybeSingle();

    if (error) throw error;

    return Boolean(data);
  }
}

export default new EstablishmentModel();
