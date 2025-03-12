import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First fix the background_theme type casting issue
  await db.execute(sql`
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_content_background_theme') THEN
            -- Create the enum type if it doesn't exist
            CREATE TYPE public.enum__pages_v_blocks_content_background_theme AS ENUM ('default', 'light', 'dark');
        END IF;
    END
    $$;

    -- Cast the column using the method suggested by PostgreSQL
    ALTER TABLE public._pages_v_blocks_content 
    ALTER COLUMN background_theme TYPE enum__pages_v_blocks_content_background_theme 
    USING background_theme::text::enum__pages_v_blocks_content_background_theme;
  `)

  // Now update all the link appearance enums to add new values
  await db.execute(sql`
    -- For hero links
    ALTER TYPE public.enum_pages_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE public.enum_pages_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'gradient';
    ALTER TYPE public.enum_pages_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

    -- For CTA block links
    ALTER TYPE public.enum_pages_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE public.enum_pages_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'gradient';
    ALTER TYPE public.enum_pages_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

    -- For content columns links
    ALTER TYPE public.enum_pages_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE public.enum_pages_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'gradient';
    ALTER TYPE public.enum_pages_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

    -- For versioned hero links
    ALTER TYPE public.enum__pages_v_version_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE public.enum__pages_v_version_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'gradient';
    ALTER TYPE public.enum__pages_v_version_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

    -- For versioned CTA links
    ALTER TYPE public.enum__pages_v_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE public.enum__pages_v_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'gradient';
    ALTER TYPE public.enum__pages_v_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';
    
    -- For ActionTilesBlock
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_action_tiles_block_tiles_link_appearance') THEN
            CREATE TYPE public.enum_pages_blocks_action_tiles_block_tiles_link_appearance AS ENUM('default', 'outline', 'primary', 'gradient', 'secondary');
            ALTER TABLE pages_blocks_action_tiles_block_tiles ADD COLUMN link_appearance enum_pages_blocks_action_tiles_block_tiles_link_appearance DEFAULT 'default';
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_action_tiles_block_tiles_link_appearance') THEN
            CREATE TYPE public.enum__pages_v_blocks_action_tiles_block_tiles_link_appearance AS ENUM('default', 'outline', 'primary', 'gradient', 'secondary');
            ALTER TABLE _pages_v_blocks_action_tiles_block_tiles ADD COLUMN link_appearance enum__pages_v_blocks_action_tiles_block_tiles_link_appearance DEFAULT 'default';
        END IF;
    END 
    $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Since enums can't be easily downgraded (removing values) in PostgreSQL,
  // and we're only adding values, the down migration will be minimal
  await db.execute(sql`
    -- We can't easily remove values from enum types in PostgreSQL, 
    -- so we'll just acknowledge that we can't fully revert these changes
    SELECT 'Cannot easily downgrade enum types by removing values in PostgreSQL' as message;
  `)
}
