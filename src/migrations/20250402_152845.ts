import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" DROP COLUMN IF EXISTS "position";
  ALTER TABLE "services" DROP COLUMN IF EXISTS "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ADD COLUMN "position" numeric;
  ALTER TABLE "services" ADD COLUMN "description" jsonb;`)
}
