import * as migration_20250311_201815_add_background_theme from './20250311_201815_add_background_theme';
import * as migration_20250311_202708_add_background_theme_to_version from './20250311_202708_add_background_theme_to_version';
import * as migration_20250311_202806_add_column_to_version_table from './20250311_202806_add_column_to_version_table';

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
    up: migration_20250311_202806_add_column_to_version_table.up,
    down: migration_20250311_202806_add_column_to_version_table.down,
    name: '20250311_202806_add_column_to_version_table'
  },
];
