import { supabase } from 'utils/supabaseClient';
import * as userService from 'resources/user/user.service';

export const createCompany = async () => {
  const { data, error } = await supabase
    .from('companies')
    .insert([{}]);

  if (error) throw error;

  return data[0];
};

export const getCurrentUserCompanyId = async () => {
  const user = userService.getUser();

  const { data, error } = await supabase
    .from('profiles')
    .select('company_id')
    .match({ user_id: user.id })
    .limit(1)
    .single();

  if (error) throw error;

  return data.company_id;
};
