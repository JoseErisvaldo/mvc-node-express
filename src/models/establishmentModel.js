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

  async findById(id) {
    const { data, error } = await supabase
      .from("establishments")
      .select("*")
      .eq("id", id)
      .single();

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

  async update(id, payload) {
    const { data, error } = await supabase
      .from("establishments")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("establishments")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

export default new EstablishmentModel();
