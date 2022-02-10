import { supabase } from 'utils/supabaseClient';

export const getUser = () => supabase.auth.user();

export const getUserId = () => supabase.auth.user().id;

export const updateUser = async (data) => {
  const { error } = await supabase.auth.update({
    data,
  });

  if (error) throw error;
};

export const signUp = async ({ email, password, data }) => {
  const { user, session, error } = await supabase.auth.signUp(
    {
      email,
      password,
    },
    {
      ...(data && { data }),
    },
  );

  if (error) throw error;

  return { user, session, error };
};

export const signInByPassword = async ({ email, password }) => {
  const { error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) throw error;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

// server only methods
export const sendEmailInvitationWithMagicLink = async ({ email, data }) => {
  const { error } = await supabase.auth
    .api.inviteUserByEmail(email, { data });

  if (error) throw error;
};
