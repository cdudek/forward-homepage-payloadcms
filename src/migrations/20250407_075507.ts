import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_grid_block_features" ALTER COLUMN "title" SET DEFAULT '';
  ALTER TABLE "pages_blocks_feature_grid_block_features" ALTER COLUMN "description" SET DEFAULT '';
  ALTER TABLE "pages_blocks_feature_grid_block" ALTER COLUMN "title" SET DEFAULT 'Your value creation partner for growth&nbsp;&nbsp;innovation';
  ALTER TABLE "pages_blocks_feature_grid_block" ALTER COLUMN "gradient_text" SET DEFAULT 'growth&nbsp;&nbsp;innovation';
  ALTER TABLE "_pages_v_blocks_feature_grid_block_features" ALTER COLUMN "title" SET DEFAULT '';
  ALTER TABLE "_pages_v_blocks_feature_grid_block_features" ALTER COLUMN "description" SET DEFAULT '';
  ALTER TABLE "_pages_v_blocks_feature_grid_block" ALTER COLUMN "title" SET DEFAULT 'Your value creation partner for growth&nbsp;&nbsp;innovation';
  ALTER TABLE "_pages_v_blocks_feature_grid_block" ALTER COLUMN "gradient_text" SET DEFAULT 'growth&nbsp;&nbsp;innovation';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_grid_block_features" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "pages_blocks_feature_grid_block_features" ALTER COLUMN "description" DROP DEFAULT;
  ALTER TABLE "pages_blocks_feature_grid_block" ALTER COLUMN "title" SET DEFAULT '';
  ALTER TABLE "pages_blocks_feature_grid_block" ALTER COLUMN "gradient_text" SET DEFAULT '';
  ALTER TABLE "_pages_v_blocks_feature_grid_block_features" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_feature_grid_block_features" ALTER COLUMN "description" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_feature_grid_block" ALTER COLUMN "title" SET DEFAULT '';
  ALTER TABLE "_pages_v_blocks_feature_grid_block" ALTER COLUMN "gradient_text" SET DEFAULT '';`)
}
