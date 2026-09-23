# Maintenance Page

Halaman maintenance yang dapat dikonfigurasi untuk BKPSDM Pesisir Selatan.

## Fitur

- Desain modern dengan animasi
- Dark mode support
- Responsive design
- Pesan dapat dikustomisasi via environment variables
- Tidak memerlukan database

## Konfigurasi Pesan

Pesan maintenance dapat disesuaikan melalui environment variables:

### Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `NEXT_PUBLIC_MAINTENANCE_TITLE` | Judul utama | "Sedang Dalam Perbaikan" |
| `NEXT_PUBLIC_MAINTENANCE_SUBTITLE` | Subtitle di bawah judul | "Kami sedang melakukan pemeliharaan sistem..." |
| `NEXT_PUBLIC_MAINTENANCE_WHAT` | Penjelasan "Apa yang terjadi?" | "Sistem sedang dalam proses pembaruan..." |
| `NEXT_PUBLIC_MAINTENANCE_WHEN` | Penjelasan "Kapan selesai?" | "Kami akan kembali online secepatnya..." |
| `NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME` | Estimasi waktu selesai (opsional) | - |
| `NEXT_PUBLIC_MAINTENANCE_CONTACT` | Info kontak (opsional) | - |

## Cara Mengubah Pesan

### 1. Edit docker-compose.yml

Edit file `docker-compose.yml` dan ubah nilai di bagian `build.args`:

```yaml
build:
  args:
    NEXT_PUBLIC_MAINTENANCE_TITLE: "Server Maintenance"
    NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME: "Estimasi selesai: Pukul 15:00 WIB"
```

### 2. Rebuild dan Restart Container

Karena menggunakan static build, perlu rebuild image:

```bash
docker compose down
docker compose up -d --build
```

Build akan memakan waktu sekitar 30-60 detik.

## CI/CD Pipeline

Full CI/CD using GitHub Actions. No source code on VPS.

```
GitHub Push → GitHub Actions (Build) → ghcr.io → SSH → VPS (Pull & Deploy)
```

### How It Works

1. Push to `main` branch triggers GitHub Actions
2. Builds Docker image and pushes to `ghcr.io/rowzend/maintenance-page`
3. SSHs into VPS (`vps-dev`, 103.143.152.139) and deploys
4. VPS pulls latest image and restarts container

### GitHub Secrets Required

| Secret | Value |
|--------|-------|
| `VPS_HOST` | `103.143.152.139` |
| `VPS_USER` | `dev` |
| `VPS_SSH_KEY` | SSH private key for vps-dev |
| `MAINTENANCE_TITLE` | Page title |
| `MAINTENANCE_SUBTITLE` | Subtitle text |
| `MAINTENANCE_WHAT` | What's happening |
| `MAINTENANCE_WHEN` | When finished |
| `MAINTENANCE_ESTIMATED_TIME` | Estimated time (optional) |
| `MAINTENANCE_CONTACT` | Contact info (optional) |

### Trigger Deployment

```bash
git push origin main
```

Or manually via GitHub Actions tab → Run workflow.

### Check Deployment Status

```bash
ssh vps-dev "docker compose -C /home/dev/maintenance-page ps"
ssh vps-dev "docker compose -C /home/dev/maintenance-page logs"
```

### Update Maintenance Messages

1. Edit `.env.example`
2. Update GitHub secrets (`gh secret set ...`)
3. Push to `main` branch
4. Pipeline rebuilds and deploys automatically

## Development

```bash
npm install
npm run dev
npm run build
npm start
```

## Docker

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

## Port

- Development: http://localhost:3000
- Production (Docker): http://localhost:3099

## Files Structure

```
├── .github/workflows/deploy.yml  # CI/CD pipeline
├── deploy/
│   ├── docker-compose.vps.yml    # VPS compose reference
│   └── deploy.sh                 # Manual deploy script
├── Dockerfile                    # Multi-stage build
├── docker-compose.yml            # Local development
├── app/                          # Next.js app
├── public/                       # Static assets
├── .env.example                  # Environment variables
└── DEPLOYMENT.md                 # Full deployment guide
```

## Contoh Penggunaan

### Maintenance Terjadwal

```yaml
build:
  args:
    NEXT_PUBLIC_MAINTENANCE_TITLE: "Maintenance Terjadwal"
    NEXT_PUBLIC_MAINTENANCE_SUBTITLE: "Sistem akan kembali normal sebentar lagi"
    NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME: "Estimasi selesai: Pukul 14:00 WIB"
    NEXT_PUBLIC_MAINTENANCE_CONTACT: "Hubungi: 0812-xxxx-xxxx"
```

### Emergency Maintenance

```yaml
build:
  args:
    NEXT_PUBLIC_MAINTENANCE_TITLE: "Perbaikan Darurat"
    NEXT_PUBLIC_MAINTENANCE_SUBTITLE: "Kami sedang memperbaiki masalah teknis"
    NEXT_PUBLIC_MAINTENANCE_WHAT: "Terjadi gangguan pada sistem. Tim kami sedang bekerja untuk memperbaikinya secepat mungkin."
    NEXT_PUBLIC_MAINTENANCE_WHEN: "Mohon cek kembali dalam 30 menit."
```

### Update Sistem

```yaml
build:
  args:
    NEXT_PUBLIC_MAINTENANCE_TITLE: "Update Sistem"
    NEXT_PUBLIC_MAINTENANCE_SUBTITLE: "Menambahkan fitur baru untuk Anda"
    NEXT_PUBLIC_MAINTENANCE_WHAT: "Kami sedang mengupdate sistem dengan fitur-fitur baru dan perbaikan bug."
    NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME: "Selesai dalam 1 jam"
```
