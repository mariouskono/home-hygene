"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Droplets, User, Lock, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      document.cookie = `role=${data.role}; path=/`;
      document.cookie = `username=${username}; path=/`;
      toast(isLogin ? "Login berhasil!" : "Akun dibuat!", "success");
      setTimeout(() => {
        if (data.role.startsWith("admin")) {
          router.push("/dashboard");
        } else {
          router.push("/home");
        }
      }, 500);
    } else {
      const data = await res.json();
      toast(data.message || "Login failed", "error");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative transition-colors selection:bg-emerald-200 dark:selection:bg-emerald-800"
      style={{ backgroundImage: 'url(/images/top-view-disinfecting-supplies-table.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark Overlay over the background image */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-0"></div>

      {/* Tombol Kembali Floating */}
      <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2 text-white hover:text-emerald-300 font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm transition-all hover:-translate-x-1 z-50">
        &larr; <span className="hidden sm:inline">Kembali ke Beranda</span>
      </Link>

      {/* Container */}
      <div className="flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden max-w-md w-full z-10 border border-white/20 dark:border-slate-800">
        
        {/* Only Side: Form */}
        <div className="w-full p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-emerald-600 mb-8 justify-center">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <Droplets className="text-white" size={22} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">Home<span className="text-emerald-500">Hygn</span></span>
          </div>

          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight text-center">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-slate-500 mt-2 text-sm text-center">
            {isLogin ? "Silakan masuk untuk melanjutkan aktivitas Anda." : "Daftar sekarang untuk memesan layanan pembersihan."}
          </p>

          <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <User size={20} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 w-full flex justify-center items-center gap-2 bg-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/30 transition-all duration-300"
            >
              {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline decoration-2 underline-offset-4"
            >
              {isLogin ? "Daftar di sini" : "Masuk di sini"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
