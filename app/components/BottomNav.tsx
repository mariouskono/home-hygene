"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Home, Store, Map } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    { name: "Beranda", path: "/home", icon: Home },
    { name: "Toko", path: "/shop", icon: Store },
    { name: "Keranjang", path: "/cart", icon: ShoppingCart },
    { name: "Lacak", path: "/lacak", icon: Map },
    { name: "Profil", path: "/akun", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-[4000] pb-safe md:hidden">
      <ul className="flex justify-between items-center h-[72px] px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li key={item.name} className="relative z-0">
              <Link
                href={item.path}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transparent"
                }`}
              >
                <div className="relative">
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {item.name === "Keranjang" && totalItems > 0 && !isActive && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white dark:border-slate-900">
                      {totalItems}
                    </span>
                  )}
                </div>
                {/* Bubble Text */}
                {isActive && (
                  <span className="text-sm tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
