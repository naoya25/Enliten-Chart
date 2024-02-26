import { createClient, SupabaseClient } from '@supabase/supabase-js';

// supabaseの初期化を行う
export const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
);
