"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Home, User, LayoutDashboard, ShoppingBag, ShoppingCart, LogOut, PackageOpen, Users, PlusSquare, Store, ChevronDown, CheckCircle, Wallet, Map, Droplets, Bell } from "lucide-react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  const router = useRouter();
  const [role, setRole] = useState("user");
  const [tokoOpen, setTokoOpen] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/(^| )role=([^;]+)/);
    if (match) setRole(match[2]);
    if (pathname === "/dashboard" && currentTab.startsWith("products")) setTokoOpen(true);
  }, [pathname, currentTab]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  const navItemsUser = [
    { name: "Beranda Utama", path: "/home", icon: Home },
    { name: "Toko Peralatan", path: "/shop", icon: Store },
    { name: "Keranjang", path: "/cart", icon: ShoppingCart },
    { name: "Lacak Pesanan", path: "/lacak", icon: Map },
    { name: "Notifikasi", path: "/notifikasi", icon: Bell },
  ];

  return (
    <div
      className={`fixed top-0 left-0 bg-white dark:bg-slate-900 h-full z-[2000] overflow-x-hidden scrollbar-hide transition-all duration-300 ease-in-out print:hidden ${
        isOpen 
          ? "w-64 border-r border-slate-200 dark:border-slate-800 shadow-2xl md:shadow-none" 
          : "w-0 md:w-20 md:border-r md:border-slate-200 dark:md:border-slate-800"
      }`}
    >
      <div className="flex flex-col h-full py-8">
        <div className="flex items-center justify-center mb-10 px-6">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <Droplets className="text-white" size={22} strokeWidth={2.5} />
          </div>
          <span
            className={`ml-4 font-black font-heading text-xl tracking-tight transition-opacity duration-300 whitespace-nowrap text-slate-800 dark:text-slate-100 ${
              isOpen ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          >
            Home<span className="text-emerald-500">Hygn</span>
          </span>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-2 overflow-y-auto pb-6">
          {role.startsWith("admin") ? (
            <>
              {/* ADMIN SIDEBAR LINKS */}
              <Link href="/dashboard?tab=overview" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${pathname === "/dashboard" && currentTab === "overview" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                <LayoutDashboard size={20} className="shrink-0" />
                <span className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>Dashboard</span>
              </Link>
              
              <Link href="/dashboard?tab=orders" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${pathname === "/dashboard" && currentTab === "orders" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                <PackageOpen size={20} className="shrink-0" />
                <span className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>Pesanan</span>
              </Link>

              <Link href="/dashboard?tab=employees" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${pathname === "/dashboard" && currentTab === "employees" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                <Users size={20} className="shrink-0" />
                <span className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>Karyawan</span>
              </Link>

              {/* TOKO ACCORDION */}
              <div>
                <button onClick={() => { setTokoOpen(!tokoOpen); if(!isOpen) router.push("/dashboard?tab=products-list"); }} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl transition-all ${pathname === "/dashboard" && currentTab.startsWith("products") ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                  <div className="flex items-center gap-4">
                    <ShoppingBag size={20} className="shrink-0" />
                    <span className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>Toko</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 shrink-0 ${isOpen ? "block" : "hidden"} ${tokoOpen ? "rotate-180" : ""}`} />
                </button>
                {/* Toko Children */}
                <div className={`overflow-hidden transition-all duration-300 pl-4 ${tokoOpen && isOpen ? "max-h-40 opacity-100 pt-2" : "max-h-0 opacity-0"}`}>
                  <Link href="/dashboard?tab=products-list" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${currentTab === "products-list" ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                    <Store size={18} /> <span className="text-sm whitespace-nowrap">Etalase Toko</span>
                  </Link>
                  <Link href="/dashboard?tab=products-add" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${currentTab === "products-add" ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                    <PlusSquare size={18} /> <span className="text-sm whitespace-nowrap">Tambah Produk</span>
                  </Link>
                </div>
              </div>

              <Link href="/dashboard?tab=users" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${pathname === "/dashboard" && currentTab === "users" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                <CheckCircle size={20} className="shrink-0" />
                <span className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>Pelanggan</span>
              </Link>
              
              {/* KEUANGAN TAB */}
              <Link href="/dashboard?tab=finance" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${pathname === "/dashboard" && currentTab === "finance" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"}`}>
                <Wallet size={20} className="shrink-0" />
                <span className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>Pendapatan</span>
              </Link>
            </>
          ) : (
            <>
              {/* USER SIDEBAR LINKS */}
              {navItemsUser.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                    pathname === item.path
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <item.icon size={20} className={`shrink-0 transition-transform ${pathname === item.path ? "scale-110" : "group-hover:scale-110"}`} />
                  <span className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="px-4 border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-2">
          {/* PROFILE BUTTON AT BOTTOM TO NOT BE LOST */}
          <Link
             href="/akun"
             className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${pathname === "/akun" ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
          >
            <User size={20} className="shrink-0" />
            <span className={`transition-opacity duration-300 whitespace-nowrap font-semibold ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>{role.startsWith("admin") ? "Edit Profil Admin" : "Profil Saya"}</span>
          </Link>
          
          <a
            href="#"
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={20} className="shrink-0" />
            <span className={`transition-opacity duration-300 whitespace-nowrap font-semibold ${isOpen ? "opacity-100 block" : "opacity-0 hidden"}`}>Keluar Akun</span>
          </a>
        </div>
      </div>
    </div>
  );
}
