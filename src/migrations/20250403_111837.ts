import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "class_name" varchar DEFAULT '';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "class_name" varchar DEFAULT '';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "class_name";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "class_name";`)
}
