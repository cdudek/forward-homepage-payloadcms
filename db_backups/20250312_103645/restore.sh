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
