import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content" ALTER COLUMN "padding_x" SET DEFAULT 'medium';
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "padding_x" SET DEFAULT 'medium';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content" ALTER COLUMN "padding_x" SET DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "padding_x" SET DEFAULT 'none';`)
}
