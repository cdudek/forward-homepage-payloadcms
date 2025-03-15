#!/bin/bash

# Database connection string
DB_URL="postgres://neondb_owner:npg_Lhc4KouVz5wm@ep-cool-star-a2mgy9vk-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# Create backup directory with timestamp
BACKUP_DIR="$(dirname "$0")/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Full backup in custom format (compressed, with schema)
echo "Creating full backup..."
pg_dump "$DB_URL" \
  --format=custom \
  --verbose \
  --clean \
  --if-exists \
  --create \
  --no-owner \
  --no-privileges \
  --no-acl \
  --file="$BACKUP_DIR/full_backup.dump"

# Schema-only backup (for reference)
echo "Creating schema-only backup..."
pg_dump "$DB_URL" \
  --schema-only \
  --format=plain \
  --clean \
  --if-exists \
  --create \
  --no-owner \
  --no-privileges \
  --no-acl \
  --file="$BACKUP_DIR/schema.sql"

# Create restore script
cat > "$BACKUP_DIR/restore.sh" << 'EOF'
#!/bin/bash

# Check if backup file is provided
if [ -z "$1" ]; then
  echo "Usage: ./restore.sh <backup_file>"
  exit 1
fi

# Database connection string
DB_URL="postgres://neondb_owner:npg_CfpoTyAkq8W0@ep-cool-night-a2q30u2t-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# Restore from custom format backup
pg_restore \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  --no-acl \
  --dbname="$DB_URL" \
  "$1"
EOF

chmod +x "$BACKUP_DIR/restore.sh"

echo "Backup completed successfully!"
echo "Backup location: $BACKUP_DIR"
echo "To restore: cd $BACKUP_DIR && ./restore.sh full_backup.dump" 