
import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  console.log('process.env',process.env)
  const client = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
  );

  return client;
}
