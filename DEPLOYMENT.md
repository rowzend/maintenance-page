# CI/CD Deployment Guide

## Overview

Full CI/CD pipeline using GitHub Actions. No source code on VPS.

## Architecture

```
GitHub Push → GitHub Actions (Build) → ghcr.io → SSH → VPS (Pull & Deploy)
```

## Workflow

1. Push to `main` branch triggers GitHub Actions
2. GitHub Actions builds Docker image and pushes to `ghcr.io/rowzend/maintenance-page`
3. GitHub Actions SSHs into `vps-dev` (103.143.152.139)
4. VPS pulls latest image and restarts container

## GitHub Secrets Required

| Secret | Value | Description |
|--------|-------|-------------|
| `VPS_HOST` | `103.143.152.139` | VPS IP address |
| `VPS_USER` | `dev` | SSH username |
| `VPS_SSH_KEY` | *(content of ~/.ssh/vps_dev_key)* | SSH private key |
| `MAINTENANCE_TITLE` | `Under Maintenance` | Page title |
| `MAINTENANCE_SUBTITLE` | *(Indonesian text)* | Subtitle |
| `MAINTENANCE_WHAT` | *(Indonesian text)* | What's happening |
| `MAINTENANCE_WHEN` | *(Indonesian text)* | When finished |
| `MAINTENANCE_ESTIMATED_TIME` | *(optional)* | Estimated time |
| `MAINTENANCE_CONTACT` | *(optional)* | Contact info |

## Setup Steps

### 1. Create GitHub Repository

```bash
gh repo create maintenance-page --public --source=. --remote=origin --push
```

### 2. Configure GitHub Secrets

```bash
gh secret set VPS_HOST --body "103.143.152.139"
gh secret set VPS_USER --body "dev"
gh secret set VPS_SSH_KEY --body "$(cat ~/.ssh/vps_dev_key)"
gh secret set MAINTENANCE_TITLE --body "Under Maintenance"
gh secret set MAINTENANCE_SUBTITLE --body "..."
gh secret set MAINTENANCE_WHAT --body "..."
gh secret set MAINTENANCE_WHEN --body "..."
gh secret set MAINTENANCE_ESTIMATED_TIME --body ""
gh secret set MAINTENANCE_CONTACT --body "..."
```

### 3. VPS Directory Setup

```bash
ssh vps-dev "mkdir -p /home/dev/maintenance-page"
```

### 4. Verify Deployment

```bash
gh workflow run deploy
```

Or simply push to main:
```bash
git push origin main
```

## Files

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD pipeline |
| `docker-compose.yml` | Local development compose |
| `deploy/docker-compose.vps.yml` | VPS production compose reference |
| `deploy/deploy.sh` | Manual deployment script |
| `Dockerfile` | Multi-stage Docker build |
| `.env.example` | Environment variables template |

## Manual Deployment (if needed)

```bash
ssh vps-dev "cd /home/dev/maintenance-page && docker compose pull && docker compose up -d --remove-orphans"
```

## Update Maintenance Messages

1. Update `.env.example`
2. Update GitHub secrets (MAINTENANCE_*)
3. Push to main branch
4. Pipeline rebuilds and deploys automatically

## Troubleshooting

### Check VPS container status
```bash
ssh vps-dev "docker compose -C /home/dev/maintenance-page ps"
ssh vps-dev "docker compose -C /home/dev/maintenance-page logs"
```

### Rebuild manually
```bash
ssh vps-dev "cd /home/dev/maintenance-page && docker compose pull && docker compose down && docker compose up -d"
```
