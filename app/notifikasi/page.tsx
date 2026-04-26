"use client";

import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { Bell, CheckCircle2, Tag, Package } from "lucide-react";

export default function NotifikasiPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const match = document.cookie.match(/(^| )username=([^;]+)/);
    const username = match ? match[2] : "";
    
    fetch(`/api/orders?username=${username}`)
      .then(res => res.json())
      .then(data => setOrders(data || []));
  }, []);

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
          <Bell className="text-emerald-500" size={28} /> Notifikasi
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Pemberitahuan terbaru terkait pesanan dan promo Anda.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Dynamic: Show notifications for recent orders */}
        {orders.length > 0 && orders.map((order: any) => (
          <div key={order.orderId} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-start gap-4 shadow-sm">
            <div className="w-11 h-11 min-w-[44px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center">
              <Package size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Pesanan {order.orderId}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Status: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{order.status || "Menunggu Konfirmasi"}</span> — {order.address}
              </p>
              <p className="text-xs text-slate-400 mt-2">{order.date} | {order.time}</p>
            </div>
          </div>
        ))}

        {/* Static promo notification */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-start gap-4 shadow-sm">
          <div className="w-11 h-11 min-w-[44px] bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center">
            <Tag size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Promo Spesial</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Dapatkan diskon 20% untuk semua layanan paket selama bulan ini. Gunakan kode: BERSIH20</p>
            <p className="text-xs text-slate-400 mt-2">Berlaku hingga akhir bulan</p>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-start gap-4 shadow-sm">
          <div className="w-11 h-11 min-w-[44px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Selamat Datang di HomeHygn</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Akun Anda telah aktif. Mulai pesan layanan pembersihan rumah sekarang.</p>
            <p className="text-xs text-slate-400 mt-2">Saat pendaftaran</p>
          </div>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <Bell size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Belum ada riwayat pesanan.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
