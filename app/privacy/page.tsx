"use client";

import Link from "next/link";
import { Droplets, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Kebijakan Privasi</h1>
        <p className="text-sm text-slate-400 mb-12">Terakhir diperbarui: April 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Kami mengumpulkan informasi yang Anda berikan secara langsung saat mendaftar akun, melakukan pemesanan, atau menghubungi layanan pelanggan kami. Informasi ini meliputi nama lengkap, alamat email, nomor telepon, alamat rumah, dan detail pesanan.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">2. Penggunaan Informasi</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Informasi yang kami kumpulkan digunakan untuk memproses pesanan Anda, mengirimkan notifikasi terkait layanan, meningkatkan kualitas layanan, serta menjaga keamanan akun Anda. Kami tidak akan menjual atau menyewakan data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">3. Keamanan Data</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data pribadi Anda dari akses tidak sah, penggunaan, pengungkapan, atau penghancuran. Setiap akun dilindungi dengan kata sandi dan data pesanan hanya dapat diakses oleh pemilik akun masing-masing.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">4. Privasi Antar Pengguna</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Setiap pengguna hanya dapat melihat dan mengakses data miliknya sendiri. Riwayat pesanan, informasi profil, dan data transaksi bersifat privat dan tidak dapat dilihat oleh pengguna lain. Administrator sistem memiliki akses untuk keperluan operasional semata.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">5. Cookie</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Kami menggunakan cookie untuk menyimpan sesi login dan preferensi tampilan (mode terang/gelap). Cookie ini diperlukan agar aplikasi dapat berfungsi dengan baik dan memberikan pengalaman yang konsisten.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">6. Hak Pengguna</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Anda berhak untuk mengakses, memperbarui, atau menghapus data pribadi Anda kapan saja melalui halaman profil akun. Jika Anda ingin menghapus akun secara permanen, silakan hubungi tim kami melalui email di info@homehygn.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">7. Kontak</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami di info@homehygn.com atau +62 812-3456-7890.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
