import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services_accordion_block" ALTER COLUMN "title" SET DEFAULT 'Our Value Creation Services';
  ALTER TABLE "pages_blocks_services_accordion_block" ALTER COLUMN "gradient" SET DEFAULT 'Value Creation';
  ALTER TABLE "_pages_v_blocks_services_accordion_block" ALTER COLUMN "title" SET DEFAULT 'Our Value Creation Services';
  ALTER TABLE "_pages_v_blocks_services_accordion_block" ALTER COLUMN "gradient" SET DEFAULT 'Value Creation';
  ALTER TABLE "pages_blocks_services_accordion_block" ADD COLUMN "description" varchar DEFAULT '';
  ALTER TABLE "_pages_v_blocks_services_accordion_block" ADD COLUMN "description" varchar DEFAULT '';
  ALTER TABLE "pages_blocks_services_accordion_block" DROP COLUMN IF EXISTS "limit";
  ALTER TABLE "_pages_v_blocks_services_accordion_block" DROP COLUMN IF EXISTS "limit";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services_accordion_block" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "pages_blocks_services_accordion_block" ALTER COLUMN "gradient" SET DEFAULT '';
  ALTER TABLE "_pages_v_blocks_services_accordion_block" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_services_accordion_block" ALTER COLUMN "gradient" SET DEFAULT '';
  ALTER TABLE "pages_blocks_services_accordion_block" ADD COLUMN "limit" numeric DEFAULT 5;
  ALTER TABLE "_pages_v_blocks_services_accordion_block" ADD COLUMN "limit" numeric DEFAULT 5;
  ALTER TABLE "pages_blocks_services_accordion_block" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_services_accordion_block" DROP COLUMN IF EXISTS "description";`)
}
