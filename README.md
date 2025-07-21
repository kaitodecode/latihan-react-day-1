# Aplikasi Manajemen Data dengan React, Redux, dan TypeScript

## Deskripsi Proyek

Aplikasi ini adalah sistem manajemen data yang dibangun menggunakan React, Redux, TypeScript, dan Vite. Aplikasi ini memungkinkan pengguna untuk mengelola data trainer dan mahasiswa dengan fitur CRUD (Create, Read, Update, Delete) lengkap. Aplikasi menggunakan Redux untuk manajemen state global dan React Router untuk navigasi antar halaman.

## Teknologi yang Digunakan

- **React 19**: Library JavaScript untuk membangun antarmuka pengguna
- **TypeScript**: Superset JavaScript yang menambahkan tipe statis
- **Redux Toolkit**: Library untuk manajemen state global
- **React Router**: Library untuk navigasi antar halaman
- **Axios**: Library untuk melakukan HTTP request
- **Tailwind CSS**: Framework CSS untuk styling
- **Vite**: Build tool yang cepat untuk pengembangan web modern
- **Prisma**: ORM (Object-Relational Mapping) untuk akses database
- **PostgreSQL**: Database relasional
- **Docker**: Untuk kontainerisasi database dan adminer

## Struktur Proyek

```
src/
├── assets/            # Aset statis seperti gambar
├── components/        # Komponen yang dapat digunakan kembali
├── features/          # Fitur-fitur aplikasi (berdasarkan domain)
│   ├── contact/       # Halaman kontak
│   ├── documentation/ # Halaman dokumentasi
│   ├── home/          # Halaman beranda
│   ├── owner/         # Fitur pengelolaan pemilik
│   ├── profile/       # Halaman profil
│   ├── students/      # Fitur pengelolaan mahasiswa (tanpa Redux)
│   ├── students_redux/ # Fitur pengelolaan mahasiswa (dengan Redux)
│   ├── trainer/       # Fitur pengelolaan trainer (tanpa Redux)
│   ├── trainer_redux/ # Fitur pengelolaan trainer (dengan Redux)
│   └── user/          # Fitur pengelolaan pengguna
├── layouts/           # Layout aplikasi
├── lib/               # Utilitas dan helper
├── login/             # Fitur login
├── redux/             # Konfigurasi dan slice Redux
│   ├── index.ts       # Konfigurasi store Redux
│   └── slice/         # Slice Redux untuk setiap fitur
│       ├── auth.ts    # Slice untuk autentikasi
│       ├── student.ts # Slice untuk data mahasiswa
│       └── trainer.ts # Slice untuk data trainer
└── routes/            # Konfigurasi routing aplikasi
```

## Fitur Utama

### 1. Manajemen Data Trainer

Aplikasi ini memungkinkan pengguna untuk:
- Melihat daftar trainer
- Menambahkan trainer baru
- Mengedit data trainer yang ada
- Menghapus trainer

Data trainer mencakup:
- Nama
- Email
- Nomor telepon
- Gender
- LinkedIn
- Status

### 2. Manajemen Data Mahasiswa

Aplikasi ini memungkinkan pengguna untuk:
- Melihat daftar mahasiswa
- Menambahkan mahasiswa baru
- Mengedit data mahasiswa yang ada
- Menghapus mahasiswa

Data mahasiswa mencakup:
- Nama
- Email
- Nomor telepon
- NIM (Nomor Induk Mahasiswa)

### 3. Autentikasi

Aplikasi ini memiliki sistem autentikasi sederhana yang memungkinkan pengguna untuk:
- Login menggunakan NIM
- Logout

## Implementasi Redux

Aplikasi ini menggunakan Redux Toolkit untuk manajemen state global. Berikut adalah slice Redux yang digunakan:

### 1. Auth Slice

Mengelola state autentikasi pengguna:
- Login dengan NIM
- Menyimpan data pengguna di localStorage
- Logout

### 2. Trainer Slice

Mengelola state data trainer:
- Mengambil daftar trainer dari API
- Menambahkan trainer baru
- Memperbarui data trainer
- Menghapus trainer

### 3. Student Slice

Mengelola state data mahasiswa:
- Mengambil daftar mahasiswa dari API
- Menambahkan mahasiswa baru
- Memperbarui data mahasiswa
- Menghapus mahasiswa

## Cara Menjalankan Aplikasi

### Prasyarat

- Node.js (versi terbaru)
- Docker dan Docker Compose (untuk menjalankan database)

### Langkah-langkah

1. Clone repositori ini

2. Jalankan database PostgreSQL menggunakan Docker:
   ```
   docker-compose up -d
   ```
   Ini akan menjalankan PostgreSQL pada port 33333 dan Adminer (UI untuk database) pada port 33330.

3. Install dependensi dengan menjalankan:
   ```
   npm install
   ```

4. Jalankan migrasi database dengan Prisma:
   ```
   npx prisma migrate dev
   ```

5. Jalankan aplikasi dalam mode pengembangan:
   ```
   npm run dev
   ```

6. Buka browser dan akses `http://localhost:5173`

### Mengakses Adminer

Untuk mengelola database melalui UI:
1. Buka browser dan akses `http://localhost:33330`
2. Login dengan kredensial berikut:
   - System: PostgreSQL
   - Server: db
   - Username: postgres
   - Password: postgres
   - Database: mydb

## Membangun Aplikasi untuk Produksi

Untuk membangun aplikasi untuk produksi, jalankan:

```
npm run build
```

File hasil build akan tersedia di folder `dist`.

## Struktur Database

Aplikasi ini menggunakan PostgreSQL sebagai database dan Prisma sebagai ORM. Berikut adalah model database yang digunakan:

### Model Todo

```prisma
enum TodoStatus {
  SUCCESS
  PENDING
  REJECT
}

model Todo {
  id String @id @default(cuid())
  task String
  status TodoStatus
  created_at DateTime
  
  @@index([created_at])
  @@map("todos") 
}
```

## API Endpoints

Aplikasi ini berkomunikasi dengan backend melalui API berikut:

### Auth API
- `GET /api/Student/login/:nim` - Login dengan NIM

### Trainer API
- `GET /api/Trainer/` - Mendapatkan semua data trainer
- `POST /api/Trainer/` - Menambahkan trainer baru
- `PUT /api/Trainer/:id` - Memperbarui data trainer
- `DELETE /api/Trainer/:id` - Menghapus trainer

### Student API
- `GET /api/Student/` - Mendapatkan semua data mahasiswa
- `POST /api/Student/` - Menambahkan mahasiswa baru
- `PUT /api/Student/:id` - Memperbarui data mahasiswa
- `DELETE /api/Student/:id` - Menghapus mahasiswa

## Konfigurasi Docker

Aplikasi ini menggunakan Docker Compose untuk menjalankan database PostgreSQL dan Adminer. Berikut adalah konfigurasi Docker Compose yang digunakan:

```yaml
services:
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=mydb
    ports:
      - "33333:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  adminer:
    image: adminer
    restart: always
    ports:
      - "33330:8080"
    depends_on:
      - db
```

## Kontributor

Aplikasi ini dikembangkan sebagai proyek latihan React.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
