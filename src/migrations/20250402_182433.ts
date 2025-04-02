import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_case_study_block" DROP COLUMN IF EXISTS "limit";
  ALTER TABLE "_pages_v_blocks_case_study_block" DROP COLUMN IF EXISTS "limit";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_case_study_block" ADD COLUMN "limit" numeric DEFAULT 5;
  ALTER TABLE "_pages_v_blocks_case_study_block" ADD COLUMN "limit" numeric DEFAULT 5;`)
}
