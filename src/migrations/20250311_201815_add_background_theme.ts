import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create enum type if it doesn't exist
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_content_background_theme') THEN
        CREATE TYPE "enum_pages_blocks_content_background_theme" AS ENUM('default', 'light', 'dark');
      END IF;
    END $$;

    -- Add the background_theme column to the main table as an enum
    ALTER TABLE "pages_blocks_content" 
    DROP COLUMN IF EXISTS "background_theme";
    
    ALTER TABLE "pages_blocks_content" 
    ADD COLUMN IF NOT EXISTS "background_theme" "enum_pages_blocks_content_background_theme" DEFAULT 'default';

    -- Handle the versioning table if it exists
    DO $$ 
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '_pages_v_blocks_content') THEN
        ALTER TABLE "_pages_v_blocks_content" 
        DROP COLUMN IF EXISTS "background_theme";
        
        ALTER TABLE "_pages_v_blocks_content" 
        ADD COLUMN IF NOT EXISTS "background_theme" "enum_pages_blocks_content_background_theme" DEFAULT 'default';
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Remove the background_theme column from the main table
    ALTER TABLE "pages_blocks_content" 
    DROP COLUMN IF EXISTS "background_theme";

    -- Remove from versioning table if it exists
    DO $$ 
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '_pages_v_blocks_content') THEN
        ALTER TABLE "_pages_v_blocks_content" 
        DROP COLUMN IF EXISTS "background_theme";
      END IF;
    END $$;

    -- We don't drop the enum type as it might be used elsewhere
  `)
}
