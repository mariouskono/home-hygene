"use client";

import { useState } from "react";
import { PlusSquare, Edit, Save, XCircle } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface UsersTabProps {
  users: any[];
  toast: (msg: string, type?: ToastType) => void;
  onReload: () => void;
}

export default function UsersTab({ users, toast, onReload }: UsersTabProps) {
  const [mode, setMode] = useState("list");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Edit user modal state
  const [editUser, setEditUser] = useState<any>(null);
  const [newUserRole, setNewUserRole] = useState("");

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    toast("Akun baru berhasil diciptakan!", "success");
    setNewUsername(""); setNewPassword(""); setMode("list");
    onReload();
  };

  const handleSaveRole = async () => {
    const res = await fetch("/api/users", { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ username: editUser.username, data: { role: newUserRole } }) });
    if(res.ok) { toast("Data Pengguna Berhasil Diubah", "success"); onReload(); setEditUser(null); }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm animate-in fade-in duration-300">
        {mode === "add" ? (
          <div className="w-full max-w-2xl mx-auto">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6">Tambahkan Akun Pengguna / Admin Baru</h3>
            <form onSubmit={handleCreateUser} className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Username Kredensial</label>
                <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} type="text" placeholder="Gunakan ID unik" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Kata Sandi Akses</label>
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="text" placeholder="Minimal 6 karakter" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
              </div>
              <div className="flex gap-4 mt-2">
                <button type="submit" className="flex-1 bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 transition-all flex justify-center items-center gap-2"><Save size={18} /> Ciptakan Akun Sekarang</button>
                <button type="button" onClick={() => setMode("list")} className="px-8 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 transition-colors">Batal</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Manajemen Pelanggan</h3>
              <button onClick={() => { setNewUsername(""); setNewPassword(""); setMode("add"); }} className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-200 flex gap-2 items-center"><PlusSquare size={18} /> Buat Akun Baru</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                    <th className="pb-4">Pengguna</th>
                    <th className="pb-4">Username</th>
                    <th className="pb-4">Telepon</th>
                    <th className="pb-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {users.map((u: any) => (
                    <tr key={u.username} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                      <td className="py-4 flex gap-4 items-center">
                        <img src={`https://ui-avatars.com/api/?name=${u.name || u.username}&background=10b981&color=fff`} className="w-10 h-10 rounded-full" alt="avatar" />
                        <p className="font-bold text-slate-800 dark:text-slate-200">{u.name || "Belum diatur"}</p>
                      </td>
                      <td className="py-4 font-mono text-sm">{u.username}</td>
                      <td className="py-4 text-slate-500">{u.phone || "-"}</td>
                      <td className="py-4 text-right">
                        <button onClick={() => { setEditUser(u); setNewUserRole(u.role || "user"); }} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-500 hover:text-white"><Edit size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* POPUP MODAL: EDIT USER ROLE */}
      {editUser && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Ubah Data Pengguna</h3>
              <button onClick={() => setEditUser(null)} className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"><XCircle size={24} /></button>
            </div>
            
            <div className="flex flex-col gap-5">
               <div>
                 <label className="text-sm font-bold text-slate-500 mb-1 block">Username</label>
                 <input disabled value={editUser.username} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-slate-500 opacity-70" />
               </div>
               <div>
                 <label className="text-sm font-bold text-slate-500 mb-1 block">Peran (Role)</label>
                 <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                   <option value="user">Pelanggan Biasa</option>
                   <option value="admin">Administrator</option>
                 </select>
               </div>
               
               <button onClick={handleSaveRole} className="mt-4 w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 transition-all">Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
