import * as migration_20250401_024406 from './20250401_024406';
import * as migration_20250402_065936 from './20250402_065936';

export const migrations = [
  {
    up: migration_20250401_024406.up,
    down: migration_20250401_024406.down,
    name: '20250401_024406',
  },
  {
    up: migration_20250402_065936.up,
    down: migration_20250402_065936.down,
    name: '20250402_065936'
  },
];
