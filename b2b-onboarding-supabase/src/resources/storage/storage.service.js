import supabase from 'utils/supabaseClient';

export const uploadFile = async ({ bucket, file, path }) => {
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  if (uploadError) throw uploadError;
};
