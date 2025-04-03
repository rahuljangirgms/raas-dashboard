// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;  // Your Supabase URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;  // Your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);  // Create and export the Supabase client
