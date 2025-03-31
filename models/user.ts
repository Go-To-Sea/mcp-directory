import { User } from "@/types/user";
import { getSupabaseClient } from "./db";

export async function insertUser(user: User) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("users").insert(user);

  if (error) throw error;
  return data;
}

export async function findUserByEmail(
  email: string,
  signin_provider: string
): Promise<User | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("signin_provider", signin_provider)
    .single();

  if (!data) return undefined;

  return formatUser(data);
}

export async function findUserByUuid(uuid: string): Promise<User | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uuid", uuid)
    .single();

  if (!data) return undefined;

  return formatUser(data);
}

export function formatUser(row: any): User {
  const user: User = {
    uuid: row.uuid,
    email: row.email,
    created_at: row.created_at,
    nickname: row.nickname,
    avatar_url: row.avatar_url,
    locale: row.locale,
    signin_type: row.signin_type,
    signin_ip: row.signin_ip,
    signin_provider: row.signin_provider,
    signin_openid: row.signin_openid,
  };

  return user;
}

/**
 * 插入或更新用户信息
 * 如果用户已存在（基于email和signin_provider），则更新用户信息
 * 如果用户不存在，则创建新用户
 */
export async function upsertUser(user: User) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .upsert(user, { 
      onConflict: 'email,signin_provider',
      ignoreDuplicates: false
    })
    .select();

  if (error) throw error;
  return data;
}
