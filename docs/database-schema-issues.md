# Database Schema Issues and Solutions

## Issue: Enum Type Conflicts

### Problem
When PayloadCMS tries to create or modify enum types in the database, it can encounter conflicts with existing enum types. This typically happens when:
1. Old enum types exist with different naming conventions
2. Tables are using old enum types that conflict with new ones
3. Versioning tables (_pages_v_*) have their own copies of these types

### Symptoms
- Errors like: `column "X" cannot be cast automatically to type enum_Y`
- Database migration failures
- PayloadCMS startup errors

### Solution Steps

1. **Identify the Problem**
   ```sql
   -- Check existing enum types
   \dT
   
   -- Check table structure
   \d table_name
   ```

2. **Clean Up Enum Types**
   - Only drop the specific enum types causing issues
   - Use CASCADE carefully as it will affect all dependent objects
   ```sql
   -- Example for a specific enum
   DROP TYPE IF EXISTS old_enum_type CASCADE;
   ```

3. **Clean Up Tables**
   - Only drop columns that are causing issues
   - Be careful not to drop entire tables unless necessary
   ```sql
   -- Example for dropping a specific column
   ALTER TABLE table_name DROP COLUMN problematic_column;
   ```

4. **Let PayloadCMS Recreate**
   - After cleaning up, restart the application
   - PayloadCMS will recreate the necessary types and columns

### Best Practices

1. **Be Surgical**
   - Only remove what's absolutely necessary
   - Don't drop entire tables unless you're sure
   - Keep track of what you're removing

2. **Backup First**
   - Always backup your database before making schema changes
   - Document what you're going to change

3. **Check Dependencies**
   - Use `\d+ table_name` to check table dependencies
   - Be aware of foreign key constraints
   - Consider versioning tables (_pages_v_*)

4. **Test in Development**
   - Always test schema changes in development first
   - Have a rollback plan

### Common Tables to Watch

1. **Core Tables**
   - `pages`
   - `media`
   - `users`

2. **Block Tables**
   - `pages_blocks_*`
   - `_pages_v_blocks_*`

3. **Versioning Tables**
   - All tables starting with `_pages_v_`

### Example Commands

```sql
-- Check enum types
\dT

-- Check table structure
\d table_name

-- Drop specific enum type
DROP TYPE IF EXISTS enum_name CASCADE;

-- Drop specific column
ALTER TABLE table_name DROP COLUMN column_name;

-- Check table dependencies
\d+ table_name
```

## Recent Issues and Solutions

### Number Grid Block Issue
- Problem: Conflicting enum types for `number_color_type`
- Solution: Dropped specific columns and let PayloadCMS recreate them

### Action Tiles Block Issue
- Problem: Missing tables for action tiles
- Solution: Let PayloadCMS recreate the tables with correct schema

### Number Grid Block Header and Enum Type Issue
- Problem: 
  1. Missing `header` column in `pages_blocks_number_grid_block` table
  2. Enum type casting issues with `columns` field
- Solution: 
  1. Added missing header column:
  ```sql
  ALTER TABLE pages_blocks_number_grid_block ADD COLUMN header TEXT;
  ALTER TABLE _pages_v_blocks_number_grid_block ADD COLUMN header TEXT;
  ```
  2. Fixed enum type casting:
  ```sql
  ALTER TABLE pages_blocks_number_grid_block 
  ALTER COLUMN columns TYPE enum_pages_blocks_number_grid_block_columns 
  USING columns::enum_pages_blocks_number_grid_block_columns;
  ```

## Prevention

1. **Regular Schema Reviews**
   - Review database schema regularly
   - Clean up unused types and columns
   - Keep documentation up to date

2. **Migration Strategy**
   - Plan migrations carefully
   - Test in development first
   - Have rollback procedures

3. **Monitoring**
   - Watch for schema-related errors
   - Monitor database size and performance
   - Keep track of table relationships 

### Database Connection
The project uses a Neon PostgreSQL database. Connection details are stored in `.env`:
```
DATABASE_URL=postgres://neondb_owner:npg_CfpoTyAkq8W0@ep-cool-night-a2q30u2t-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

For direct database access:
```bash
psql "$DATABASE_URL"
```

## Database Backups and Migrations

### Database Backups

1. **Full Database Backup**
   ```bash
   # Backup entire database
   pg_dump "$DATABASE_URL" > backup_$(date +%Y%m%d).sql
   
   # Backup specific tables
   pg_dump "$DATABASE_URL" -t table_name > table_backup_$(date +%Y%m%d).sql
   ```

2. **Schema-only Backup**
   ```bash
   # Backup schema only (no data)
   pg_dump "$DATABASE_URL" --schema-only > schema_backup_$(date +%Y%m%d).sql
   ```

3. **Data-only Backup**
   ```bash
   # Backup data only (no schema)
   pg_dump "$DATABASE_URL" --data-only > data_backup_$(date +%Y%m%d).sql
   ```

### Creating Migrations

1. **Using PayloadCMS Migrations**
   ```typescript
   // src/migrations/YYYYMMDDHHMMSS_migration_name.ts
   import { MigrateUpArgs, MigrateDownArgs } from 'payload/database'
   
   export async function up({ payload }: MigrateUpArgs): Promise<void> {
     // Migration up logic
     await payload.db.raw(`
       ALTER TABLE table_name ADD COLUMN column_name TEXT;
     `)
   }
   
   export async function down({ payload }: MigrateDownArgs): Promise<void> {
     // Rollback logic
     await payload.db.raw(`
       ALTER TABLE table_name DROP COLUMN column_name;
     `)
   }
   ```

2. **Running Migrations**
   ```bash
   # Run pending migrations
   pnpm payload migrate
   
   # Rollback last migration
   pnpm payload migrate:down
   ```

### Best Practices

1. **Backup Before Migration**
   - Always create a full backup before running migrations
   - Store backups in a secure location
   - Use meaningful backup filenames with timestamps

2. **Migration Guidelines**
   - Create one migration file per change
   - Include both `up` and `down` functions
   - Test migrations in development first
   - Keep migrations idempotent (can be run multiple times safely)

3. **Version Control**
   - Commit migration files to version control
   - Include migration files in code reviews
   - Document breaking changes

4. **Deployment Process**
   ```bash
   # 1. Backup database
   pg_dump "$DATABASE_URL" > backup_$(date +%Y%m%d).sql
   
   # 2. Run migrations
   pnpm payload migrate
   
   # 3. Verify changes
   psql "$DATABASE_URL" -c "\d table_name"
   ```

5. **Rollback Plan**
   - Keep backup files accessible
   - Test rollback procedures
   - Document rollback steps

### Example Migration Workflow

1. **Create Migration File**
   ```bash
   # Create new migration file
   touch src/migrations/$(date +%Y%m%d%H%M%S)_add_header_column.ts
   ```

2. **Write Migration**
   ```typescript
   import { MigrateUpArgs, MigrateDownArgs } from 'payload/database'
   
   export async function up({ payload }: MigrateUpArgs): Promise<void> {
     // Add header column
     await payload.db.raw(`
       ALTER TABLE pages_blocks_number_grid_block 
       ADD COLUMN header TEXT;
       
       ALTER TABLE _pages_v_blocks_number_grid_block 
       ADD COLUMN header TEXT;
     `)
   }
   
   export async function down({ payload }: MigrateDownArgs): Promise<void> {
     // Remove header column
     await payload.db.raw(`
       ALTER TABLE pages_blocks_number_grid_block 
       DROP COLUMN header;
       
       ALTER TABLE _pages_v_blocks_number_grid_block 
       DROP COLUMN header;
     `)
   }
   ```

3. **Test Migration**
   ```bash
   # Run migration
   pnpm payload migrate
   
   # Verify changes
   psql "$DATABASE_URL" -c "\d pages_blocks_number_grid_block"
   ``` 