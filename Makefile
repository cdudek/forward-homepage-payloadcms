.PHONY: build-db generate-types generate-db-schema dev start migrate backup restore help

# Default target
help:
	@echo "Available commands:"
	@echo "  make build-db          - Update database schema (runs generate-types and generate-db-schema)"
	@echo "  make generate-types    - Generate TypeScript types from Payload collections"
	@echo "  make generate-db-schema - Generate database schema from Payload config"
	@echo "  make dev               - Start development server"
	@echo "  make migrate           - Run database migrations"
	@echo "  make backup            - Backup database to db_backups folder"
	@echo "  make restore           - Restore database from latest backup"

# Main command to update the database schema
build-db: generate-types generate-db-schema
	@echo "Database schema updated."

# Generate TypeScript types
generate-types:
	@echo "Generating TypeScript types..."
	pnpm payload generate:types

# Generate database schema
generate-db-schema:
	@echo "Generating database schema..."
	pnpm payload generate:db-schema

# Start development server
dev:
	@echo "Starting development server..."
	pnpm run dev

# Run database migrations
migrate:
	@echo "Running database migrations..."
	pnpm payload migrate

# Backup database 
backup:
	@echo "Backing up database..."
	mkdir -p db_backups/$(shell date +%Y%m%d_%H%M%S)
	pg_dump -h localhost -U postgres -d payload > db_backups/$(shell date +%Y%m%d_%H%M%S)/payload_backup.sql
	@echo "Backup created in db_backups/$(shell date +%Y%m%d_%H%M%S)/payload_backup.sql"

# Restore database from latest backup
restore:
	@echo "Restoring database from latest backup..."
	@LATEST_BACKUP=$$(ls -td db_backups/*/ | head -1); \
	if [ -z "$$LATEST_BACKUP" ]; then \
		echo "No backups found"; \
		exit 1; \
	fi; \
	echo "Restoring from $$LATEST_BACKUP"; \
	psql -h localhost -U postgres -d payload < "$$LATEST_BACKUP/payload_backup.sql"
	@echo "Database restored." 