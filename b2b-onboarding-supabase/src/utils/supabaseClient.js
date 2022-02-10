import config from 'config';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(config.supabase.url, config.supabase.anonKey);

supabase.sendRequest = async (request, data) => {
  const response = await request(data);

  if (response.error) {
    throw response.error.error_description || response.error.message;
  }

  return response;
};

export default supabase;
