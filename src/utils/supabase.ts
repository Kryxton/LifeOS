import { createClient } from '@supabase/supabase-js';

// Get and clean keys
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// More aggressive cleaning: remove all trailing slashes and whitespace
export const supabaseUrl = rawUrl.trim().split('?')[0].replace(/\/+$/, '');
export const supabaseAnonKey = rawKey.trim();

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);

export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '' && !supabaseUrl.includes('placeholder');
};
