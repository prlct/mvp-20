import supabase from 'utils/supabaseClient';

import * as userService from 'resources/user/user.service';

export const getProfileId = async () => {
  const user = userService.getUser();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id')
    .match({ user_id: user.id })
    .limit(1)
    .single();

  if (error) throw error;

  return profile.id;
};

export const getProfile = async () => {
  const user = userService.getUser();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select()
    .match({ user_id: user.id })
    .limit(1)
    .single();

  if (error) throw error;

  return profile;
};

export const createProfile = async ({
  userId, companyId, firstName = null, lastName = null, houseInfo = null,
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      company_id: companyId,
      firstName,
      lastName,
      houseInfo,
    });

  if (error) throw error;

  return data;
};

export const updateProfile = async (profileData) => {
  const profileId = await getProfileId();

  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .match({ id: profileId });

  if (error) throw error;

  return data;
};
