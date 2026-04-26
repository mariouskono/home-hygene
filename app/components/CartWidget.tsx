"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, X, Trash2 } from "lucide-react";

export default function CartWidget() {
  const { cart, totalItems, totalPrice, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (totalItems === 0) return null;

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-[3000]">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-600/40 flex items-center justify-center relative hover:scale-105 hover:bg-emerald-500 transition-all"
      >
        <ShoppingCart size={28} strokeWidth={2.5} />
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-6 h-6 flex justify-center items-center rounded-full border-2 border-white dark:border-slate-900">
          {totalItems}
        </span>
      </button>

      {/* Cart Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Keranjang Belanja</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-hide">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-transparent dark:border-slate-800">
                <div className="flex flex-col overflow-hidden w-40">
                  <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm truncate" title={item.name}>
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Rp{item.price.toLocaleString("id-ID")} <span className="text-slate-400 font-medium">x {item.quantity}</span>
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 flex justify-center items-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-4">
            <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
              <span>Total Tagihan:</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-xl font-black">Rp{totalPrice.toLocaleString("id-ID")}</span>
            </div>
            <Link
              href="/checkout"
              className="w-full text-center bg-emerald-600 text-white py-3.5 rounded-2xl font-bold tracking-wide hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
              onClick={() => setIsOpen(false)}
            >
               Checkout Sekarang
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
