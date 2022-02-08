import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQzODE4NjM5LCJleHAiOjE5NTkzOTQ2Mzl9.bGdgi5Za2S49VW0mTfuCFsJYn1jEaUDPZ26BO0IHBio';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
