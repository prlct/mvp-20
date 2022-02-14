import 'moment-duration-format';
import * as moment from 'moment';

import * as migrationService from './migration.service';

const migrator: any = {};

interface Duration extends moment.Duration {
  format: (template?: string, precision?: number, settings?: DurationSettings) => string;
}

interface DurationSettings {
  forceLength: boolean;
  precision: number;
  template: string;
  trim: boolean | 'left' | 'right';
}

const run = async (migrations: any, curVersion: any) => {
  const newMigrations = migrations
    .filter((migration: any) => migration.version > curVersion)
    .sort((a: any, b: any) => a.version - b.version);

  if (!newMigrations.length) {
    console.log(`No new migrations found. Current database version is ${curVersion}`);
    return;
  }

  let migration;
  let lastMigrationVersion;

  try {
    for (migration of newMigrations) {

      const startTime = new Date();
      console.log(`Migration #${migration.version} is running: ${migration.description}`);
      await migration.migrate();
      await migrationService.createNewMigration(migration.version, migration.description);

      lastMigrationVersion = migration.version;
      await migrationService.setNewMigrationVersion(migration.version);
      const finishTime = new Date();

      const duration = moment.duration(+finishTime - +startTime) as Duration;
      const formattedDuration = duration.format('h [hrs], m [min], s [sec], S [ms]');

      console.log(`Database has been updated to the version #${migration.version}`);
      console.log(`Time of migration #${migration.version}: ${formattedDuration}`);
    }

    console.log(`All migrations has been finished. Current database version is: ${lastMigrationVersion}`);
  } catch (err) {
    console.error(`Failed to update migration to version ${migration.version}`);
    console.error(err);

    throw err;
  }
};

migrator.exec = async () => {
  const [migrations, currentVersion] = await Promise.all([
    migrationService.getMigrations(),
    migrationService.getCurrentMigrationVersion(),
  ]);

  await run(migrations, currentVersion);
};

export default migrator;
