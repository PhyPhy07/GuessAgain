import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);
console.log('Supabase URL:', import.meta.env.VITE_APP_SUPABASE_URL);
console.log('Supabase anon key:', import.meta.env.VITE_APP_SUPABASE_ANON_KEY);