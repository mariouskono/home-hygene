"use client";

import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { User, Phone, MapPin, Save, Edit2, LogOut } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function AccountPage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    phone: "",
    address: "",
    role: "pelanggan",
  });

  useEffect(() => {
    // Read username from cookie
    const match = document.cookie.match(/(^| )username=([^;]+)/);
    const username = match ? match[2] : "";
    const roleMatch = document.cookie.match(/(^| )role=([^;]+)/);
    const role = roleMatch ? roleMatch[2] : "pelanggan";

    if (username) {
      // Fetch user data from API to get actual profile
      fetch("/api/users")
        .then(res => res.json())
        .then((users) => {
          const found = users.find((u: any) => u.username === username);
          if (found) {
            setProfile({
              username: found.username,
              name: found.name || found.username,
              phone: found.phone || "",
              address: found.address || "",
              role: found.role || role,
            });
          } else {
            setProfile(prev => ({ ...prev, username, role }));
          }
        });
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: profile.username, data: profile }),
      });
      if (res.ok) {
        toast("Profil berhasil diperbarui!", "success");
        setIsEditing(false);
      } else {
        toast("Gagal memperbarui profil.", "error");
      }
    } catch (e) {
      toast("Kesalahan jaringan.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const roleLabel = profile.role?.startsWith("admin") ? "Administrator" : "Pelanggan";

  return (
    <PageLayout>
      <div className="flex items-center justify-between gap-[16px] flex-wrap mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Profil Akun
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-sm max-w-3xl flex flex-col md:flex-row gap-10">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl relative group cursor-pointer">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || profile.username)}&background=10b981&color=fff&size=200`} alt="Avatar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit2 className="text-white mb-1" size={20} />
              <span className="text-white text-xs font-bold">Ubah Foto</span>
            </div>
          </div>
          <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">{roleLabel}</span>
          <span className="text-xs font-mono text-slate-400">@{profile.username}</span>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Biodata Diri</h2>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-bold transition-colors">
                <Edit2 size={16} /> Edit
              </button>
            ) : (
              <button disabled={isSaving} onClick={handleSave} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-500 transition-colors disabled:opacity-50 shadow-lg shadow-emerald-500/20">
                <Save size={16} /> {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            )}
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <User size={16} /> Nama Lengkap
              </label>
              {isEditing ? (
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium outline-none transition-all dark:text-white" />
              ) : (
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 rounded-xl border border-transparent">{profile.name || "Belum diatur"}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Phone size={16} /> Nomor Telepon
              </label>
              {isEditing ? (
                <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium outline-none transition-all dark:text-white" />
              ) : (
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 rounded-xl border border-transparent">{profile.phone || "Belum diatur"}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <MapPin size={16} /> Alamat Utama
              </label>
              {isEditing ? (
                <textarea value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium outline-none transition-all min-h-[100px] dark:text-white"></textarea>
              ) : (
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 rounded-xl border border-transparent">{profile.address || "Belum diatur"}</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE LOGOUT BUTTON */}
      <button 
        onClick={() => {
          document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
          document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
          window.location.href = "/login";
        }}
        className="md:hidden mt-8 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 py-4 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
      >
        <LogOut size={20} />
        Keluar Akun
      </button>

    </PageLayout>
  );
}
