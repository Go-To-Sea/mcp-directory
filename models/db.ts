
import { createClient } from "@supabase/supabase-js";

// 保留原有的 Supabase 客户端获取方法
export function getSupabaseClient() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  return client;
}

// 新增通用操作方法（不影响已有功能）
export const db = {
  async insert(table: string, data: any) {
    const supabase = getSupabaseClient();
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  },

  async update(table: string, id: string, updates: any) {
    const supabase = getSupabaseClient();
    const { data: result, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  },

  async findOne(table: string, column: string, value: any) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq(column, value)
      .single();

    return error ? null : data;
  }
};
