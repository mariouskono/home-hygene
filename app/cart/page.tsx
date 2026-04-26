"use client";

import PageLayout from "../components/PageLayout";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, totalItems, totalPrice, removeFromCart } = useCart();

  return (
    <PageLayout>
      <div className="flex items-center justify-between gap-[16px] flex-wrap mb-8">
        <div className="left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Keranjang Anda
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Periksa kembali item pesanan pembersihan dan alat Anda.</p>
        </div>
      </div>

      {totalItems === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 opacity-50">
            <ShoppingCart size={48} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Keranjang Kosong</h2>
          <p className="text-slate-500 max-w-md mb-8">Anda belum menambahkan pesanan paket pembersihan atau peralatan apapun ke dalam keranjang.</p>
          <Link href="/home" className="bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">
             Mulai Jelajah Layanan
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-2/3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Daftar Item ({totalItems})</h3>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-transparent dark:border-slate-800 group transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-xl bg-white p-1 shadow-sm" />
                    ) : (
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm font-black text-xl">PKG</div>
                    )}
                    <div className="flex flex-col overflow-hidden w-full max-w-[200px]">
                      <span className="text-slate-800 dark:text-slate-200 font-bold text-md truncate" title={item.name}>
                        {item.name}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-black text-lg mt-1">
                        Rp{item.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-6">
                    <span className="font-bold text-slate-500 bg-slate-200 dark:bg-slate-700 px-4 py-1.5 rounded-lg">x {item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 flex justify-center items-center hover:bg-red-500 hover:text-white transition-all ml-auto"
                      title="Hapus item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Ringkasan</h3>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                <span>Total Item</span>
                <span>{totalItems} item</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                <span>Biaya Layanan</span>
                <span className="text-emerald-600 font-bold">Gratis</span>
              </div>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col gap-6">
              <div className="flex flex-col">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase mb-1">Total Tagihan</span>
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">Rp{totalPrice.toLocaleString("id-ID")}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-emerald-500 hover:shadow-lg hover:-translate-y-1 hover:shadow-emerald-600/30 transition-all"
              >
                Checkout Sekarang <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
