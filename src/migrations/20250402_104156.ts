import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_action_tiles_block" ADD COLUMN "title" varchar DEFAULT 'Our Proposition';
  ALTER TABLE "pages_blocks_action_tiles_block" ADD COLUMN "gradient" varchar DEFAULT 'Proposition';
  ALTER TABLE "pages_blocks_action_tiles_block" ADD COLUMN "description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  ALTER TABLE "_pages_v_blocks_action_tiles_block" ADD COLUMN "title" varchar DEFAULT 'Our Proposition';
  ALTER TABLE "_pages_v_blocks_action_tiles_block" ADD COLUMN "gradient" varchar DEFAULT 'Proposition';
  ALTER TABLE "_pages_v_blocks_action_tiles_block" ADD COLUMN "description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_action_tiles_block" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_action_tiles_block" DROP COLUMN IF EXISTS "gradient";
  ALTER TABLE "pages_blocks_action_tiles_block" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_action_tiles_block" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_action_tiles_block" DROP COLUMN IF EXISTS "gradient";
  ALTER TABLE "_pages_v_blocks_action_tiles_block" DROP COLUMN IF EXISTS "description";`)
}
