#!/bin/bash
set -e

# Wait for PostgreSQL to be ready
until pg_isready -U "$POSTGRES_USER"; do
  echo "Waiting for postgres..."
  sleep 2
done

# Run SQL files manually against specific databases
psql -U "$POSTGRES_USER" -d users_db -f /docker-entrypoint-initdb.d/users_db_schema.sql
