"use client";

import Link from "next/link";
import { Droplets, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-body">
      <nav className="sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 border-b border-slate-100 dark:border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Droplets className="text-white" size={16} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-800 dark:text-white">Home<span className="text-emerald-600">Hygn</span></span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Kembali
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Syarat & Ketentuan</h1>
        <p className="text-sm text-slate-400 mb-12">Terakhir diperbarui: April 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">1. Ketentuan Umum</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Dengan mengakses dan menggunakan platform HomeHygn, Anda menyetujui untuk terikat dengan syarat dan ketentuan yang berlaku. Layanan ini ditujukan untuk pengguna yang berusia minimal 17 tahun atau telah mendapat persetujuan dari orang tua/wali.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">2. Layanan Pembersihan</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">HomeHygn menyediakan layanan pembersihan rumah melalui tenaga profesional terlatih dan bersertifikat. Setiap paket layanan memiliki cakupan pekerjaan yang telah ditentukan. Penambahan area kerja di luar paket dapat dikenakan biaya tambahan.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">3. Pemesanan & Pembayaran</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Pemesanan dilakukan melalui platform dengan memilih paket, menentukan jadwal, dan mengisi alamat lengkap. Pembayaran dapat dilakukan setelah layanan selesai dikerjakan. Pembatalan pesanan dapat dilakukan maksimal 2 jam sebelum jadwal yang ditentukan.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">4. Toko Peralatan</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Produk yang dijual melalui toko HomeHygn adalah peralatan dan bahan kebersihan berkualitas. Setiap produk memiliki deskripsi dan harga yang tertera. Pembelian produk akan diproses bersamaan dengan pesanan layanan atau dikirim secara terpisah.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">5. Garansi Layanan</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Kami memberikan garansi kepuasan untuk setiap layanan. Jika hasil pembersihan tidak memenuhi standar yang dijanjikan, Anda dapat mengajukan pengerjaan ulang tanpa biaya tambahan dalam waktu 24 jam setelah layanan selesai.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">6. Keamanan Akun</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Setiap pengguna bertanggung jawab menjaga kerahasiaan kredensial akunnya. Data pesanan dan informasi pribadi setiap akun bersifat privat dan hanya dapat diakses oleh pemilik akun yang bersangkutan. Segala aktivitas yang terjadi melalui akun Anda merupakan tanggung jawab Anda.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">7. Perubahan Ketentuan</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">HomeHygn berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diinformasikan melalui platform dan berlaku efektif sejak tanggal publikasi. Penggunaan layanan yang berkelanjutan setelah perubahan berarti Anda menerima ketentuan baru.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">8. Kontak</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Untuk pertanyaan lebih lanjut mengenai syarat dan ketentuan ini, silakan hubungi kami di info@homehygn.com atau +62 812-3456-7890.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
