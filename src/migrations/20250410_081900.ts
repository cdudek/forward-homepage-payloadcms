import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "pages_blocks_action_tiles_block_tiles" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "pages_blocks_product_feature_block" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "pages_blocks_services_accordion_block" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "_pages_v_blocks_action_tiles_block_tiles" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "_pages_v_blocks_product_feature_block" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "_pages_v_blocks_services_accordion_block" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "footer_social_links" ADD COLUMN "link_is_c_t_a" boolean;
  ALTER TABLE "footer_legal_links" ADD COLUMN "link_is_c_t_a" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "pages_blocks_action_tiles_block_tiles" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "pages_blocks_product_feature_block" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "pages_blocks_services_accordion_block" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "_pages_v_blocks_action_tiles_block_tiles" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "_pages_v_blocks_product_feature_block" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "_pages_v_blocks_services_accordion_block" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "footer_nav_items" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "footer_social_links" DROP COLUMN IF EXISTS "link_is_c_t_a";
  ALTER TABLE "footer_legal_links" DROP COLUMN IF EXISTS "link_is_c_t_a";`)
}
