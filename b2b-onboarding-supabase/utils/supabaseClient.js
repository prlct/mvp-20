import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = 'https://codyiaxfrolognzgllfl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzgxODYzOSwiZXhwIjoxOTU5Mzk0NjM5fQ.eLB5XXDN9vktQphukJbTdSVcWczCgoYOwQzFS4R8sBc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);