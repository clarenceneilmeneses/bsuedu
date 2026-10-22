import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

// Server-only client. The secret key bypasses RLS, so it must never reach the browser.
export const supabase =
  url && secretKey
    ? createClient(url, secretKey, { auth: { persistSession: false } })
    : null;
