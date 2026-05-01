import { createClient } from '@supabase/supabase-js';

// Get and clean keys
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

<<<<<<< HEAD
// More aggressive cleaning: remove all trailing slashes and whitespace
export const supabaseUrl = rawUrl.trim().split('?')[0].replace(/\/+$/, '');
export const supabaseAnonKey = rawKey.trim();
=======
const supabaseUrl = rawUrl.trim().replace(/\/$/, '');
const supabaseAnonKey = rawKey.trim();
>>>>>>> 2d703cd56f55d371042338a2694add549d9124b6

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);

export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '' && !supabaseUrl.includes('placeholder');
};
