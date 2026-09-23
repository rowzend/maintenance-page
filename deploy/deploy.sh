#!/bin/bash
set -e

DEPLOY_DIR="/home/dev/maintenance-page"
cd "$DEPLOY_DIR"

echo "=== Maintenance Page Deployment ==="
echo "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"

docker compose pull
docker compose down 2>/dev/null || true
docker compose up -d --remove-orphans

echo "=== Container Status ==="
docker compose ps

echo "Deployment completed at $(date '+%Y-%m-%d %H:%M:%S')"
