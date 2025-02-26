
import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  console.log('process.env',process.env)
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  return client;
}
