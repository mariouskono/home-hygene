"use client";

import { Wallet, Printer } from "lucide-react";

interface FinanceTabProps {
  orders: any[];
}

export default function FinanceTab({ orders }: FinanceTabProps) {
  const completedOrders = orders.filter((o: any) => o.status === "Tugas Selesai" || o.status === "Selesai");
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  const printReport = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3"><Wallet className="text-emerald-500" /> Buku Pendapatan</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Rekapitulasi transaksi terselesaikan.</p>
        </div>
        <button onClick={printReport} className="print:hidden flex items-center gap-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200 dark:shadow-none">
          <Printer size={18} /> Simpan Laporan PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <th className="p-4 font-bold">Tanggal</th>
              <th className="p-4 font-bold">ID Transaksi</th>
              <th className="p-4 font-bold">Pelanggan</th>
              <th className="p-4 font-bold">Total Pembayaran</th>
            </tr>
          </thead>
          <tbody>
            {completedOrders.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Belum ada pendapatan terekam.</td></tr>
            ) : (
              completedOrders.map((o: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-slate-600 dark:text-slate-300">{o.date}</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">{o.orderId}</td>
                  <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">{o.address}</td>
                  <td className="p-4 font-black text-slate-800 dark:text-slate-100">Rp{o.total?.toLocaleString('id-ID')}</td>
                </tr>
              ))
            )}
            {completedOrders.length > 0 && (
              <tr className="bg-emerald-50 dark:bg-emerald-900/20">
                <td colSpan={3} className="p-4 text-right font-bold text-slate-800 dark:text-slate-200">Total Keseluruhan Pendapatan:</td>
                <td className="p-4 font-black text-emerald-600 dark:text-emerald-400 text-xl">Rp{totalRevenue.toLocaleString('id-ID')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="hidden print:block mt-20 text-center text-slate-500">
        <p>Dicetak melalui HomeHygene Sistem Otomatisasi.</p>
        <p>{new Date().toLocaleDateString('id-ID')}</p>
      </div>
    </div>
  );
}
