import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "header_color" SET DEFAULT 'light';
  ALTER TABLE "pages" ALTER COLUMN "mobile_menu_theme" SET DEFAULT 'light';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_header_color" SET DEFAULT 'light';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_mobile_menu_theme" SET DEFAULT 'light';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "header_color" SET DEFAULT 'dark';
  ALTER TABLE "pages" ALTER COLUMN "mobile_menu_theme" SET DEFAULT 'dark';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_header_color" SET DEFAULT 'dark';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_mobile_menu_theme" SET DEFAULT 'dark';`)
}
