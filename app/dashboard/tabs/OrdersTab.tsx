"use client";

import { PackageOpen, MapPin, Search, CheckCircle, XCircle } from "lucide-react";

interface OrdersTabProps {
  orders: any[];
  onUpdateStatus: (id: string, status: string) => void;
}

export default function OrdersTab({ orders, onUpdateStatus }: OrdersTabProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
      <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">Riwayat Pesanan Pelanggan</h3>
      <div className="overflow-x-auto w-full">
        {orders.length === 0 ? (
          <div className="py-16 text-center text-slate-400"><Search size={48} className="mx-auto opacity-30 mb-4" /><p className="font-semibold text-lg">Belum ada pesanan.</p></div>
        ) : (
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                <th className="pb-4 text-slate-500 dark:text-slate-400 text-xs tracking-wider">Order ID</th>
                <th className="pb-4 text-slate-500 dark:text-slate-400 text-xs tracking-wider">Alamat & Item</th>
                <th className="pb-4 text-slate-500 dark:text-slate-400 text-xs tracking-wider text-right">Status & Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {orders.map((o: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 group transition-colors">
                  <td className="py-5 font-mono text-xs">{o.orderId}</td>
                  <td className="py-5 pr-4">
                    <p className="font-bold text-emerald-600 flex items-center gap-1.5"><MapPin size={14} /> {o.date} | {o.time}</p>
                    <p className="mt-2 text-sm max-w-sm">{o.address}</p>
                    <div className="inline-block mt-3 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg text-emerald-700 font-bold">
                      {o.cart?.length} Items — Rp{o.total?.toLocaleString("id-ID")}
                    </div>
                  </td>
                  <td className="py-5 text-right w-48">
                    <span className={`inline-block w-full text-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                      o.status.includes("Terkonfirmasi") ? "bg-blue-100 text-blue-700" : o.status.includes("Selesai") ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>{o.status}</span>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onUpdateStatus(o.orderId, "Dikonfirmasi, Menuju Lokasi")} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white rounded-lg transition-colors" title="Kirim Pekerja"><CheckCircle size={18} /></button>
                      <button onClick={() => onUpdateStatus(o.orderId, "Tugas Selesai")} className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors" title="Nyatakan Selesai"><PackageOpen size={18} /></button>
                      <button onClick={() => onUpdateStatus(o.orderId, "Dibatalkan Admin")} className="p-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-colors" title="Batalkan"><XCircle size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
