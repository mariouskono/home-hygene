# HomeHygn

HomeHygn adalah aplikasi berbasis web untuk layanan kebersihan rumah tangga. Platform ini memungkinkan pengguna untuk memesan layanan pembersihan rumah dengan mudah dan efisien.

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan:
- **[Next.js](https://nextjs.org/)** - React framework untuk rendering dan routing.
- **[React](https://react.dev/)** - Library JavaScript untuk membangun antarmuka pengguna.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework untuk styling.
- **[Lucide React](https://lucide.dev/)** - Kumpulan ikon yang indah dan konsisten.
- **[Recharts](https://recharts.org/)** - Library chart komprehensif untuk React.

## 🛠️ Persyaratan Sistem

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut:
- [Node.js](https://nodejs.org/en/) (Disarankan versi LTS terbaru, minimal v18+)
- npm (Biasanya sudah terinstal bersama Node.js)

## 💻 Cara Instalasi dan Penggunaan

1. **Buka Terminal / Command Prompt** dan pastikan Anda berada di direktori proyek ini.
2. **Install Dependensi**
   Jalankan perintah berikut untuk mengunduh semua paket yang dibutuhkan:
   ```bash
   npm install
   ```
   > 💡 **Penting:** Langkah ini akan membuat folder `node_modules`. Anda **tidak perlu dan tidak disarankan** untuk mengunggah (push) folder ini ke GitHub karena ukurannya sangat besar. File `.gitignore` yang ada di proyek ini sudah diatur agar `node_modules` diabaikan oleh Git secara otomatis.

3. **Jalankan Development Server**
   Setelah proses instalasi selesai, jalankan server pengembangan dengan perintah:
   ```bash
   npm run dev
   ```
4. **Buka Aplikasi**
   Buka browser Anda dan kunjungi tautan berikut:
   [http://localhost:3000](http://localhost:3000)

## 📤 Cara Push ke GitHub (mariouskono/home-hygene)

Jika Anda ingin mengunggah proyek ini ke repositori Anda di GitHub, ikuti langkah-langkah berikut di terminal:

1. **Inisialisasi Git (jika belum)**
   ```bash
   git init
   ```

2. **Tambahkan semua file ke staging area**
   (Jangan khawatir tentang `node_modules` atau folder `.next`, karena Git akan otomatis mengabaikannya sesuai file `.gitignore`).
   ```bash
   git add .
   ```

3. **Buat Commit pertama Anda**
   ```bash
   git commit -m "Menambahkan file proyek HomeHygn"
   ```

4. **Hubungkan ke Repositori GitHub Anda**
   Jika Anda belum menambahkan remote repository, jalankan perintah ini:
   ```bash
   git remote add origin https://github.com/mariouskono/home-hygene.git
   ```
   *(Catatan: Jika Anda mendapatkan error "remote origin already exists", Anda bisa mengabaikan langkah ini)*

5. **Ubah nama branch utama menjadi `main` (Standar baru GitHub)**
   ```bash
   git branch -M main
   ```

6. **Push proyek ke GitHub**
   ```bash
   git push -u origin main
   ```

## 📝 Lisensi

Aplikasi ini dikembangkan untuk kebutuhan platform HomeHygn.
