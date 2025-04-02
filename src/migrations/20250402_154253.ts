import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "enable_background";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "background_theme";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "slope_enabled";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "slope_position";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "enable_background";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "background_theme";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "slope_enabled";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "slope_position";
  DROP TYPE "public"."enum_pages_blocks_content_background_theme";
  DROP TYPE "public"."enum_pages_blocks_content_slope_position";
  DROP TYPE "public"."enum__pages_v_blocks_content_background_theme";
  DROP TYPE "public"."enum__pages_v_blocks_content_slope_position";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_background_theme" AS ENUM('default', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_content_slope_position" AS ENUM('top', 'bottom', 'both');
  CREATE TYPE "public"."enum__pages_v_blocks_content_background_theme" AS ENUM('default', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_content_slope_position" AS ENUM('top', 'bottom', 'both');
  ALTER TABLE "pages_blocks_content" ADD COLUMN "enable_background" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "background_theme" "enum_pages_blocks_content_background_theme" DEFAULT 'default';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "slope_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "slope_position" "enum_pages_blocks_content_slope_position" DEFAULT 'bottom';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "enable_background" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "background_theme" "enum__pages_v_blocks_content_background_theme" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "slope_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "slope_position" "enum__pages_v_blocks_content_slope_position" DEFAULT 'bottom';`)
}
