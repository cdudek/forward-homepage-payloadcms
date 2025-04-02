import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "header_color" SET DEFAULT 'dark';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_header_color" SET DEFAULT 'dark';
  ALTER TABLE "pages_blocks_logo_grid" ADD COLUMN "title" varchar DEFAULT 'Working with Leaders Across Industries';
  ALTER TABLE "_pages_v_blocks_logo_grid" ADD COLUMN "title" varchar DEFAULT 'Working with Leaders Across Industries';
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "pages_blocks_logo_grid" DROP COLUMN IF EXISTS "header";
  ALTER TABLE "_pages_v_blocks_logo_grid" DROP COLUMN IF EXISTS "header";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "header_color" SET DEFAULT 'light';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_header_color" SET DEFAULT 'light';
  ALTER TABLE "pages_blocks_logo_grid" ADD COLUMN "header" jsonb;
  ALTER TABLE "_pages_v_blocks_logo_grid" ADD COLUMN "header" jsonb;
  ALTER TABLE "pages_blocks_logo_grid" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_logo_grid" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "placeholder";`)
}
