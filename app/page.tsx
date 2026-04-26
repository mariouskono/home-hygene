"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  ShieldCheck, Clock, MapPin, ArrowRight, Moon, Sun,
  Brush, BedDouble, TreePine, Bath, WashingMachine,
  Phone, Mail, ChevronRight, CheckCircle2, Users, Award, Zap, Droplets, Star, MessageSquare
} from "lucide-react";

const SERVICES = [
  { id: "PKG-A", name: "Paket A", subtitle: "Sapu & Pel Per Lantai", price: 150000, icon: Brush, desc: "Pembersihan lantai menyeluruh menggunakan teknik hotel bintang 5." },
  { id: "PKG-B", name: "Paket B", subtitle: "A + Vakum Kasur/Sofa", price: 250000, icon: BedDouble, desc: "Deep cleaning kasur dan sofa untuk hunian bebas tungau." },
  { id: "PKG-C", name: "Paket C", subtitle: "A + Taman", price: 300000, icon: TreePine, desc: "Pembersihan area dalam dan luar ruangan termasuk taman." },
  { id: "PKG-D", name: "Paket D", subtitle: "A + WC & Dapur", price: 350000, icon: Bath, desc: "Fokus area basah: toilet, wastafel, dan dapur bebas kerak." },
  { id: "PKG-E", name: "Paket E", subtitle: "All-in + Laundry", price: 400000, icon: WashingMachine, desc: "Paket lengkap pembersihan dan pencucian pakaian." },
];

const STATS = [
  { value: "2,500+", label: "Rumah Dibersihkan" },
  { value: "98%", label: "Kepuasan Pelanggan" },
  { value: "50+", label: "Tenaga Profesional" },
  { value: "20+", label: "Kota Terjangkau" },
];

export default function LandingPage() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4)))
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-body selection:bg-emerald-200 dark:selection:bg-emerald-800">

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-[5000] border-b border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <Droplets className="text-white" size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">Home<span className="text-emerald-600">Hygn</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#layanan" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Layanan</a>
            <a href="#produk" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Produk</a>
            <a href="#keunggulan" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Keunggulan</a>
            <a href="#kontak" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Kontak</a>
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Masuk
            </Link>
            <Link href="/login" className="text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all">
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/top-view-disinfecting-supplies-table.jpg" 
            alt="Pembersihan Rumah Profesional" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70 dark:bg-black/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-300 text-xs font-semibold tracking-wide uppercase">Jasa Pembersihan Profesional</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6">
              Rumah bersih, hidup lebih nyaman.
            </h1>
            <p className="text-base md:text-lg text-slate-300 mb-10 max-w-lg leading-relaxed">
              Layanan pembersihan rumah terpercaya dengan tenaga profesional bersertifikat. Pesan dalam hitungan detik, kami yang bereskan semuanya.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login" className="bg-emerald-600 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/25 flex items-center gap-2 group">
                Pesan Sekarang <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href="#layanan" className="bg-white/10 backdrop-blur-sm text-white border border-white/15 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 transition-all">
                Lihat Layanan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative z-20 -mt-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <p className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1.5 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ LAYANAN / SERVICES ═══════════════ */}
      <section id="layanan" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Layanan Kami</p>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-4">
              Paket pembersihan untuk setiap kebutuhan
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Pilih paket yang sesuai dengan kebutuhan rumah Anda. Semua paket termasuk peralatan dan bahan pembersih kelas premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((pkg) => (
              <div key={pkg.id} className="group p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-none transition-all duration-300">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 min-w-[48px] rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <pkg.icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{pkg.name}</h3>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{pkg.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">{pkg.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">Rp{pkg.price.toLocaleString("id-ID")}</span>
                  <Link href="/login" className="text-xs font-bold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors">
                    Pesan <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUK / SHOP PREVIEW ═══════════════ */}
      <section id="produk" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-16">
            <div className="max-w-xl">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Toko Peralatan</p>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-4">
                Peralatan kebersihan berkualitas
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Dapatkan produk pembersih pilihan yang juga digunakan oleh tim profesional kami sehari-hari.
              </p>
            </div>
            <Link href="/login" className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1.5 shrink-0 transition-colors">
              Lihat Semua Produk <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p: any) => (
              <div key={p.id} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-none transition-all duration-300">
                <div className="aspect-square bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={p.image?.startsWith("http") ? p.image : `/images/shop/${p.image}`} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/300?text=Produk"; }}
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm leading-tight line-clamp-2 min-h-[40px]">{p.name}</h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-black text-emerald-600 dark:text-emerald-400">Rp{p.price?.toLocaleString("id-ID")}</span>
                    <Link href="/login" className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors">Beli</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ KEUNGGULAN ═══════════════ */}
      <section id="keunggulan" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-16">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Mengapa HomeHygn</p>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-4">
              Standar kebersihan yang lebih tinggi
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Kami tidak sekadar membersihkan, kami menghadirkan standar kebersihan setara hotel bintang lima untuk rumah Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all">
              <div className="w-11 h-11 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck size={20} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Terverifikasi</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Seluruh staf melalui pemeriksaan latar belakang dan sertifikasi keahlian.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-blue-200 dark:hover:border-blue-900/50 transition-all">
              <div className="w-11 h-11 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Clock size={20} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Tepat Waktu</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Jadwalkan kapan saja. Tim kami hadir tepat pada waktu yang dijanjikan.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-amber-200 dark:hover:border-amber-900/50 transition-all">
              <div className="w-11 h-11 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <MapPin size={20} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Jangkauan Luas</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Melayani lebih dari 20 kota besar di seluruh Indonesia.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-purple-200 dark:hover:border-purple-900/50 transition-all">
              <div className="w-11 h-11 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Award size={20} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Bergaransi</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Hasil tidak memuaskan? Kami kerjakan ulang tanpa biaya tambahan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CARA KERJA ═══════════════ */}
      <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-16">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Cara Kerja</p>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
              Tiga langkah menuju rumah bersih
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl font-black shadow-lg shadow-emerald-600/20">1</div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">Pilih Layanan</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Pilih paket pembersihan atau beli peralatan sesuai kebutuhan Anda.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl font-black shadow-lg shadow-emerald-600/20">2</div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">Atur Jadwal</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Tentukan tanggal, waktu, dan alamat yang paling nyaman untuk Anda.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl font-black shadow-lg shadow-emerald-600/20">3</div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">Santai & Lacak</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Tim kami datang bekerja. Anda pantau progres secara real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-16">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Testimoni</p>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-4">
              Apa kata pelanggan kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Rina Wulandari", city: "Jakarta", text: "Rumah saya jadi sangat bersih dan wangi setelah menggunakan layanan HomeHygn. Tim-nya sangat profesional dan ramah." },
              { name: "Budi Santoso", city: "Bandung", text: "Saya sudah pakai layanan ini 5 kali dan selalu puas. Proses pemesanan mudah dan hasil kerja konsisten bagus." },
              { name: "Dewi Permata", city: "Surabaya", text: "Harga terjangkau dengan kualitas bintang lima. Sangat merekomendasikan untuk semua pemilik rumah." },
            ].map((t) => (
              <div key={t.name} className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={`https://ui-avatars.com/api/?name=${t.name}&background=10b981&color=fff&size=40`} className="w-10 h-10 rounded-full" alt={t.name} />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
                Siap untuk rumah yang lebih bersih?
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Bergabung dengan ribuan pemilik rumah yang mempercayakan kebersihan hunian mereka kepada HomeHygn. Daftar gratis dan nikmati promo khusus pengguna baru.
              </p>
            </div>
            <Link href="/login" className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/30 flex items-center gap-2 group shrink-0">
              Mulai Sekarang <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer id="kontak" className="bg-slate-900 dark:bg-black border-t border-slate-800/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Droplets className="text-white" size={18} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-black text-white tracking-tight">Home<span className="text-emerald-500">Hygn</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                Platform layanan pembersihan rumah profesional terpercaya di Indonesia. Bersih, cepat, dan terjangkau.
              </p>
              <div className="flex flex-col gap-2">
                <a href="tel:+6281234567890" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <Phone size={14} /> +62 812-3456-7890
                </a>
                <a href="mailto:info@homehygn.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <Mail size={14} /> info@homehygn.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Layanan</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#layanan" className="text-sm text-slate-400 hover:text-white transition-colors">Pembersihan Rumah</a></li>
                <li><a href="#layanan" className="text-sm text-slate-400 hover:text-white transition-colors">Deep Cleaning</a></li>
                <li><a href="#produk" className="text-sm text-slate-400 hover:text-white transition-colors">Toko Peralatan</a></li>
                <li><a href="#layanan" className="text-sm text-slate-400 hover:text-white transition-colors">Laundry</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Perusahaan</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#keunggulan" className="text-sm text-slate-400 hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#kontak" className="text-sm text-slate-400 hover:text-white transition-colors">Kontak</a></li>
                <li><Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} HomeHygene. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
