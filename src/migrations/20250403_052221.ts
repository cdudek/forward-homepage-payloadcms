import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_colored_text_block_text_elements" ALTER COLUMN "text" SET DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  ALTER TABLE "_pages_v_blocks_colored_text_block_text_elements" ALTER COLUMN "text" SET DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "full_width" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "slope" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "full_width" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "slope" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_colored_text_block_text_elements" ALTER COLUMN "text" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_colored_text_block_text_elements" ALTER COLUMN "text" DROP DEFAULT;
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "full_width";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "slope";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "full_width";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "slope";`)
}
