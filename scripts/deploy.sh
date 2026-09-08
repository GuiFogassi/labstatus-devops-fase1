#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."

docker compose pull || docker compose build
docker compose up -d --remove-orphans

for i in $(seq 1 20); do
  if curl -fsS "http://127.0.0.1:3000/health" >/dev/null 2>&1; then
    curl -fsS "http://127.0.0.1:3000/health"
    echo
    docker compose ps
    exit 0
  fi
  sleep 1
done

echo "API nao respondeu em /health"
docker compose logs --tail 50
exit 1
