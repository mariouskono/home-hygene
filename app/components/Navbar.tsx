"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, Droplets } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between sticky top-0 left-0 z-[1000] border-b border-slate-200 dark:border-slate-800">
      
      {/* LEFT SIDE: Hamburger + Mobile Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Logo */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center shadow-emerald-500/20 shadow-md">
            <Droplets className="text-white" size={15} strokeWidth={2.5} />
          </div>
          <span className="font-black text-slate-800 dark:text-white text-sm tracking-tight">Home<span className="text-emerald-500">Hygn</span></span>
        </div>
      </div>

      {/* RIGHT SIDE: Theme Toggle + Profile */}
      <div className="flex items-center gap-3">
        {mounted && (
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        <Link href="/akun" className="block relative w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm hover:scale-105 transition-transform">
          <img
            src="/images/IMG-20230323-WA0052.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ui-avatars.com/api/?name=User&background=10b981&color=fff";
            }}
          />
        </Link>
      </div>
    </nav>
  );
}
