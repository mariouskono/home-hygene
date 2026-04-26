"use client";

import { PackageOpen, Users, Store, Wallet } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

interface OverviewTabProps {
  orders: any[];
  products: any[];
  employees: any[];
}

export default function OverviewTab({ orders, products, employees }: OverviewTabProps) {
  // Analytics Calculations
  const completedOrders = orders.filter((o: any) => o.status === "Tugas Selesai" || o.status === "Selesai");
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  
  // Pie Chart Data (Order Status)
  const statusCounts = orders.reduce((acc: any, o: any) => {
    const stat = o.status || "Lainnya";
    acc[stat] = (acc[stat] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(statusCounts).map(key => ({ name: key, value: statusCounts[key] }));

  // Bar Chart Data (Orders by Date)
  const ordersByDate = orders.reduce((acc: any, o: any) => {
    const d = o.date || "Unknown";
    if (!acc[d]) acc[d] = { date: d, count: 0 };
    acc[d].count += 1;
    return acc;
  }, {});
  const barData = Object.values(ordersByDate).slice(-7);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-xl flex items-center justify-center"><Wallet size={22}/></div>
             <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Pendapatan Bersih</p>
           </div>
           <p className="text-3xl font-black font-heading text-slate-800 dark:text-slate-100">Rp{totalRevenue.toLocaleString('id-ID')}</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-xl flex items-center justify-center"><PackageOpen size={22}/></div>
             <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Total Pesanan</p>
           </div>
           <p className="text-3xl font-black font-heading text-slate-800 dark:text-slate-100">{orders.length}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 text-purple-600 rounded-xl flex items-center justify-center"><Store size={22}/></div>
             <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Produk/Layanan</p>
           </div>
           <p className="text-3xl font-black font-heading text-slate-800 dark:text-slate-100">{products.length}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 text-amber-600 rounded-xl flex items-center justify-center"><Users size={22}/></div>
             <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Karyawan Aktif</p>
           </div>
           <p className="text-3xl font-black font-heading text-slate-800 dark:text-slate-100">{employees.length}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Status Penyelesaian</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span> {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Grafik Kedatangan Pesanan</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
