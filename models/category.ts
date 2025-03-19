/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-02-25 22:43:42
 * @LastEditors: rendc
 * @LastEditTime: 2025-03-18 22:48:47
 */
import { Category } from "@/types/category";
import { getProjectsCountByCategory } from "./project";
import { getSupabaseClient } from "./db";

export async function insertCategory(category: Category) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("categories").insert(category);

  if (error) throw error;
  return data;
}

export async function findCategoryByName(
  name: string
): Promise<Category | undefined> {
  if (!name) return undefined;
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("name", name)
    .eq("status", "created")
    .single();

  if (error) return undefined;

  return data;
}

export async function getCategories(
  page: number,
  limit: number,
  type?: 'server' | 'client'
): Promise<Category[]> {
  const supabase = getSupabaseClient();
  let query = supabase
    .from("categories")
    .select("*");

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];
  console.log('getCategories===========',data)
  return data
}
