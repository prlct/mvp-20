import config from 'config';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(config.supabase.url, config.supabase.anonKey);

export default supabase;
