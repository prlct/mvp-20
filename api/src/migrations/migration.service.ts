import fs from 'fs';
import path from 'path';

import supabase from 'utils/supabaseClient';

const migrationsPath = path.join(__dirname, 'migrations');

const getMigrationNames = () => new Promise((resolve, reject) => {
  fs.readdir(migrationsPath, (err: any, files: any) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(files);
  });
});

export const getMigrations = () => {
  let migrations = null;

  return getMigrationNames().then((names: any) => {
    migrations = names.map((name: any) => {
      const migrationPath = path.join(migrationsPath, name);
      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(migrationPath);
    });

    return migrations;
  }).catch((err) => {
    throw err;
  });
};

export const createNewMigration = async (version: number, description: string) => {
  const { error } = await supabase
  .from('migrations')
  .insert([{ version, description }]);

  if (error) throw error;
}

export const setNewMigrationVersion = async (version: number) => {
  const { error } = await supabase
  .from('migration_version')
  .update({ current_version: version })
  .eq('id', 'migration_version');

  if (error) throw error;
}

export const getCurrentMigrationVersion = async () => {
  const { data, error } = await supabase
    .from('migration_version')
    .select('current_version')
    .limit(1)
    .single();

  if (error) throw error;

  return data.current_version;
}
