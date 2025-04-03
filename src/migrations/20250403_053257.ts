import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_grid_block" DROP COLUMN IF EXISTS "slope_enabled";
  ALTER TABLE "pages_blocks_feature_grid_block" DROP COLUMN IF EXISTS "slope_position";
  ALTER TABLE "_pages_v_blocks_feature_grid_block" DROP COLUMN IF EXISTS "slope_enabled";
  ALTER TABLE "_pages_v_blocks_feature_grid_block" DROP COLUMN IF EXISTS "slope_position";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_block_slope_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_block_slope_position";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_grid_block_slope_position" AS ENUM('top', 'bottom', 'both');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_block_slope_position" AS ENUM('top', 'bottom', 'both');
  ALTER TABLE "pages_blocks_feature_grid_block" ADD COLUMN "slope_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_feature_grid_block" ADD COLUMN "slope_position" "enum_pages_blocks_feature_grid_block_slope_position" DEFAULT 'bottom';
  ALTER TABLE "_pages_v_blocks_feature_grid_block" ADD COLUMN "slope_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_feature_grid_block" ADD COLUMN "slope_position" "enum__pages_v_blocks_feature_grid_block_slope_position" DEFAULT 'bottom';`)
}
