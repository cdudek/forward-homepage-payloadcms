import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_mobile_menu_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_mobile_menu_theme" AS ENUM('light', 'dark');
  ALTER TABLE "pages" ADD COLUMN "mobile_menu_theme" "enum_pages_mobile_menu_theme" DEFAULT 'dark';
  ALTER TABLE "_pages_v" ADD COLUMN "version_mobile_menu_theme" "enum__pages_v_version_mobile_menu_theme" DEFAULT 'dark';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "mobile_menu_theme";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_mobile_menu_theme";
  DROP TYPE "public"."enum_pages_mobile_menu_theme";
  DROP TYPE "public"."enum__pages_v_version_mobile_menu_theme";`)
}
