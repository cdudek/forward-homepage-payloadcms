import * as migration_20250401_024406 from './20250401_024406';
import * as migration_20250402_065936 from './20250402_065936';
import * as migration_20250402_100100 from './20250402_100100';
import * as migration_20250402_104156 from './20250402_104156';
import * as migration_20250402_152845 from './20250402_152845';
import * as migration_20250402_153523 from './20250402_153523';
import * as migration_20250402_154253 from './20250402_154253';

export const migrations = [
  {
    up: migration_20250401_024406.up,
    down: migration_20250401_024406.down,
    name: '20250401_024406',
  },
  {
    up: migration_20250402_065936.up,
    down: migration_20250402_065936.down,
    name: '20250402_065936',
  },
  {
    up: migration_20250402_100100.up,
    down: migration_20250402_100100.down,
    name: '20250402_100100',
  },
  {
    up: migration_20250402_104156.up,
    down: migration_20250402_104156.down,
    name: '20250402_104156',
  },
  {
    up: migration_20250402_152845.up,
    down: migration_20250402_152845.down,
    name: '20250402_152845',
  },
  {
    up: migration_20250402_153523.up,
    down: migration_20250402_153523.down,
    name: '20250402_153523',
  },
  {
    up: migration_20250402_154253.up,
    down: migration_20250402_154253.down,
    name: '20250402_154253'
  },
];
