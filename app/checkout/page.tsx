"use client";

import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useToast } from "../context/ToastContext";
import { CreditCard, MapPin, CalendarDays, Clock, StickyNote, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) { toast("Keranjang kosong!", "error"); return; }
    
    setIsSubmitting(true);
    try {
      const usernameMatch = document.cookie.match(/(^| )username=([^;]+)/);
      const currentUser = usernameMatch ? usernameMatch[2] : "guest";
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser, address, date, time, notes, cart, total: totalPrice, status: "Menunggu Konfirmasi"
        })
      });
      if (res.ok) {
        toast("Pesanan berhasil dibuat!", "success");
        clearCart();
        router.push("/notifikasi");
      } else {
        toast("Gagal membuat pesanan.", "error");
      }
    } catch {
      toast("Terjadi kesalahan jaringan.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Checkout Pesanan
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Lengkapi detail jadwal dan alamat pengerjaan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Detail Pemesanan / Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
            <CalendarDays className="text-emerald-500" size={20} /> Jadwal & Alamat
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2"><MapPin size={14} /> Alamat Lengkap</label>
              <textarea 
                required 
                value={address} onChange={(e) => setAddress(e.target.value)}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px] transition-all"
                placeholder="cth: Jl. Merdeka No.45, Jakarta"
              ></textarea>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2"><CalendarDays size={14} /> Tanggal</label>
                <input 
                  type="date" required 
                  value={date} onChange={(e) => setDate(e.target.value)}
                  className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2"><Clock size={14} /> Jam</label>
                <input 
                  type="time" required 
                  value={time} onChange={(e) => setTime(e.target.value)}
                  className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2"><StickyNote size={14} /> Catatan Khusus</label>
              <input 
                type="text" 
                value={notes} onChange={(e) => setNotes(e.target.value)}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="cth: Tolong bawa alat pel ekstra"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || cart.length === 0}
              className="mt-4 w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl text-lg hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              {isSubmitting ? "Memproses..." : "Selesaikan Pesanan & Bayar Nanti"}
            </button>
          </form>
        </div>

        {/* Ringkasan Belanja */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
            <ShoppingBag className="text-emerald-500" size={20} /> Ringkasan Keranjang
          </h2>
          {cart.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 italic">Keranjang belanja Anda kosong.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex flex-col w-[70%]">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{item.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{item.type}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-slate-600 dark:text-slate-300">x{item.quantity}</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Rp{(item.price * item.quantity).toLocaleString("id-ID")}</span>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl">
                <span className="text-lg font-bold text-slate-800 dark:text-slate-200">Total Tagihan</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
