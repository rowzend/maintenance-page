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

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Docker

```bash
# Build and run
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Port

- Development: http://localhost:3000
- Production (Docker): http://localhost:3099

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
