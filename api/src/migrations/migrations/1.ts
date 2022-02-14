import Migration from 'migrations/migration';

import supabase from 'utils/supabaseClient';

const migration = new Migration(1, 'Example');

migration.migrate = async () => {
  const { data, error } = await supabase
  .rpc('example');

  console.log(data);

  if (error) throw error;
};

module.exports = migration;
