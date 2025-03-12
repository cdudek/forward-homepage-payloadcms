import * as migration_20250311_201815_add_background_theme from './20250311_201815_add_background_theme';
import * as migration_20250311_202708_add_background_theme_to_version from './20250311_202708_add_background_theme_to_version';
import * as migration_20250311_205425 from './20250311_205425';
import * as migration_20250311_210121_update_link_appearances from './20250311_210121_update_link_appearances';

export const migrations = [
  {
    up: migration_20250311_201815_add_background_theme.up,
    down: migration_20250311_201815_add_background_theme.down,
    name: '20250311_201815_add_background_theme',
  },
  {
    up: migration_20250311_202708_add_background_theme_to_version.up,
    down: migration_20250311_202708_add_background_theme_to_version.down,
    name: '20250311_202708_add_background_theme_to_version',
  },
  {
    up: migration_20250311_205425.up,
    down: migration_20250311_205425.down,
    name: '20250311_205425',
  },
  {
    up: migration_20250311_210121_update_link_appearances.up,
    down: migration_20250311_210121_update_link_appearances.down,
    name: '20250311_210121_update_link_appearances'
  },
];
