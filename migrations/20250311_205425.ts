import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First, handle the link appearance enum updates
  await db.execute(sql`
  -- Add all the link appearance values to the enum types
  DO $$
  BEGIN
    -- Create enum types if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_action_tiles_block_tiles_link_appearance') THEN
      CREATE TYPE "public"."enum_pages_blocks_action_tiles_block_tiles_link_appearance" AS ENUM('default', 'outline', 'primary', 'gradient', 'secondary');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_action_tiles_block_tiles_link_appearance') THEN
      CREATE TYPE "public"."enum__pages_v_blocks_action_tiles_block_tiles_link_appearance" AS ENUM('default', 'outline', 'primary', 'gradient', 'secondary');
    END IF;
    
    -- Add values to existing enum types only if they don't already exist
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'primary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_hero_links_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'primary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gradient' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_hero_links_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'gradient';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'secondary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_hero_links_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE 'secondary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'primary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_blocks_cta_links_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'primary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gradient' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_blocks_cta_links_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'gradient';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'secondary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_blocks_cta_links_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE 'secondary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'primary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_blocks_content_columns_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'primary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gradient' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_blocks_content_columns_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'gradient';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'secondary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_pages_blocks_content_columns_link_appearance')) THEN
      ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'secondary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'primary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_version_hero_links_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'primary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gradient' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_version_hero_links_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'gradient';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'secondary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_version_hero_links_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE 'secondary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'primary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_blocks_cta_links_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'primary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gradient' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_blocks_cta_links_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'gradient';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'secondary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_blocks_cta_links_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE 'secondary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'primary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_blocks_content_columns_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'primary';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gradient' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_blocks_content_columns_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'gradient';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'secondary' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum__pages_v_blocks_content_columns_link_appearance')) THEN
      ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'secondary';
    END IF;
    
    -- Add columns to tables if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages_blocks_action_tiles_block_tiles' AND column_name = 'link_appearance') THEN
      ALTER TABLE "pages_blocks_action_tiles_block_tiles" ADD COLUMN "link_appearance" "enum_pages_blocks_action_tiles_block_tiles_link_appearance" DEFAULT 'default';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '_pages_v_blocks_action_tiles_block_tiles' AND column_name = 'link_appearance') THEN
      ALTER TABLE "_pages_v_blocks_action_tiles_block_tiles" ADD COLUMN "link_appearance" "enum__pages_v_blocks_action_tiles_block_tiles_link_appearance" DEFAULT 'default';
    END IF;
  END
  $$;`)

  // Now handle the background_theme casting issue separately
  try {
    await db.execute(sql`
    -- Fix for background_theme casting issue
    DO $$
    BEGIN
      -- First, handle the background_theme column
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '_pages_v_blocks_content' AND column_name = 'background_theme') THEN
        -- Create the enum type if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_content_background_theme') THEN
          CREATE TYPE public.enum__pages_v_blocks_content_background_theme AS ENUM ('default', 'light', 'dark');
        END IF;
        
        -- Drop the default value to avoid casting issues
        ALTER TABLE public._pages_v_blocks_content 
        ALTER COLUMN background_theme DROP DEFAULT;
        
        -- Cast the column to the enum type
        ALTER TABLE public._pages_v_blocks_content 
        ALTER COLUMN background_theme TYPE enum__pages_v_blocks_content_background_theme 
        USING 
          CASE 
            WHEN background_theme = 'default' THEN 'default'::enum__pages_v_blocks_content_background_theme
            WHEN background_theme = 'light' THEN 'light'::enum__pages_v_blocks_content_background_theme
            WHEN background_theme = 'dark' THEN 'dark'::enum__pages_v_blocks_content_background_theme
            ELSE 'default'::enum__pages_v_blocks_content_background_theme
          END;
        
        -- Reset the default value
        ALTER TABLE public._pages_v_blocks_content 
        ALTER COLUMN background_theme SET DEFAULT 'default';
      END IF;
    END
    $$;`)
  } catch (error) {
    console.log('Background theme migration failed, but continuing with other changes:', error)
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DO $$
  BEGIN
    -- Remove columns if they exist
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages_blocks_action_tiles_block_tiles' AND column_name = 'link_appearance') THEN
      ALTER TABLE "pages_blocks_action_tiles_block_tiles" DROP COLUMN "link_appearance";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '_pages_v_blocks_action_tiles_block_tiles' AND column_name = 'link_appearance') THEN
      ALTER TABLE "_pages_v_blocks_action_tiles_block_tiles" DROP COLUMN "link_appearance";
    END IF;
    
    -- Drop enum types if they exist
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_action_tiles_block_tiles_link_appearance') THEN
      DROP TYPE "public"."enum_pages_blocks_action_tiles_block_tiles_link_appearance";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_action_tiles_block_tiles_link_appearance') THEN
      DROP TYPE "public"."enum__pages_v_blocks_action_tiles_block_tiles_link_appearance";
    END IF;
  END
  $$;`)
}
