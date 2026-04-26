"use client";

import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { PackageSearch, CheckCircle2, Clock, Truck } from "lucide-react";

export default function LacakPesananPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read username from cookie to fetch only this user's orders
    const match = document.cookie.match(/(^| )username=([^;]+)/);
    const username = match ? match[2] : "";
    const roleMatch = document.cookie.match(/(^| )role=([^;]+)/);
    const role = roleMatch ? roleMatch[2] : "user";

    // Admin gets all orders, users get only their own
    const url = role.startsWith("admin") ? "/api/orders" : `/api/orders?username=${username}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data || []);
        setLoading(false);
      });
  }, []);

  const getStepProgress = (status: string) => {
    switch (status) {
      case "Menunggu": return 1;
      case "Menunggu Konfirmasi": return 1;
      case "Pesanan Dikonfirmasi": return 2;
      case "Diproses": return 2;
      case "Tugas Selesai": return 3;
      case "Selesai": return 3;
      default: return 1;
    }
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
          <PackageSearch className="text-emerald-500" size={32} /> Lacak Pesanan
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Pantau status layanan dan pengiriman pesanan Anda.</p>
      </div>

      {loading ? (
         <div className="flex justify-center items-center h-64 text-emerald-600 animate-pulse font-bold">Memuat data pesanan...</div>
      ) : orders.length === 0 ? (
         <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-10 text-center flex flex-col items-center">
            <PackageSearch size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Belum Ada Pesanan</h3>
            <p className="text-slate-500 dark:text-slate-500 mt-2">Anda belum melakukan pemesanan apa pun.</p>
         </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order: any, i: number) => {
            const step = getStepProgress(order.status);
            return (
              <div key={order.orderId || i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">ID: <span className="text-emerald-600">{order.orderId}</span></h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{order.date} | {order.time} — {order.address}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 px-5 py-2 rounded-xl text-center">
                    <p className="text-xs text-slate-500 font-bold mb-1">Total</p>
                    <p className="font-black text-slate-800 dark:text-slate-100">Rp{order.total?.toLocaleString('id-ID') || 0}</p>
                  </div>
                </div>

                {/* PROGRESS TRACKER */}
                <div className="relative flex justify-between items-center w-full mt-10 mb-4 px-2 md:px-10">
                  <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-slate-100 dark:bg-slate-800 rounded-full z-0"></div>
                  <div 
                    className="absolute left-[10%] top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full z-0 transition-all duration-1000" 
                    style={{ width: step === 1 ? '0%' : step === 2 ? '40%' : '80%' }}
                  ></div>

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${step >= 1 ? "bg-emerald-500 text-white border-emerald-100 dark:border-emerald-900/50" : "bg-slate-100 text-slate-400 border-white dark:border-slate-900"}`}>
                      <Clock size={18} />
                    </div>
                    <span className={`text-xs md:text-sm font-bold absolute -bottom-8 whitespace-nowrap ${step >= 1 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>Menunggu</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${step >= 2 ? "bg-emerald-500 text-white border-emerald-100 dark:border-emerald-900/50 shadow-lg shadow-emerald-500/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-white dark:border-slate-900"}`}>
                      <Truck size={18} />
                    </div>
                    <span className={`text-xs md:text-sm font-bold absolute -bottom-8 whitespace-nowrap ${step >= 2 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>Diproses</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${step >= 3 ? "bg-emerald-500 text-white border-emerald-100 dark:border-emerald-900/50 shadow-lg shadow-emerald-500/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-white dark:border-slate-900"}`}>
                      <CheckCircle2 size={18} />
                    </div>
                    <span className={`text-xs md:text-sm font-bold absolute -bottom-8 whitespace-nowrap ${step >= 3 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>Selesai</span>
                  </div>
                </div>
                
                <div className="mt-14 pt-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-5 rounded-b-3xl">
                   <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Status: <span className="text-emerald-600 dark:text-emerald-400">{order.status || "Menunggu Konfirmasi"}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageLayout>
  );
}
