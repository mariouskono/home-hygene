"use client";

import { useState } from "react";
import { PlusSquare, Edit, Trash2, Save } from "lucide-react";

interface EmployeesTabProps {
  employees: any[];
  onSaveEmployee: (data: { name: string; position: string; shift: string }, editId?: string) => void;
  onDeleteEmployee: (id: string) => void;
}

export default function EmployeesTab({ employees, onSaveEmployee, onDeleteEmployee }: EmployeesTabProps) {
  const [mode, setMode] = useState("list");
  const [editEmployee, setEditEmployee] = useState<any>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [shift, setShift] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEmployee({ name, position, shift }, editEmployee?.id);
    setName(""); setPosition(""); setShift("");
    setEditEmployee(null);
    setMode("list");
  };

  const startEdit = (emp: any) => {
    setEditEmployee(emp);
    setName(emp.name);
    setPosition(emp.position);
    setShift(emp.shift);
    setMode("add");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm animate-in fade-in duration-300">
      
      {mode === "add" ? (
        <div className="w-full max-w-2xl mx-auto">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6">{editEmployee ? "Ubah Data Karyawan" : "Pekerjakan Karyawan Baru"}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-bold text-slate-500 mb-1 block">Nama Lengkap</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-1 block">Posisi / Profesi</label>
              <input value={position} onChange={(e) => setPosition(e.target.value)} type="text" placeholder="Cleaning Service" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-1 block">Jadwal Shift</label>
              <input value={shift} onChange={(e) => setShift(e.target.value)} type="text" placeholder="Shift Pagi (08:00 - 16:00)" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
            </div>
            <div className="flex gap-4 mt-2">
              <button type="submit" className="flex-1 bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 transition-all flex justify-center items-center gap-2"><Save size={18} /> {editEmployee ? "Simpan Perbaikan" : "Simpan Karyawan"}</button>
              <button type="button" onClick={() => { setEditEmployee(null); setMode("list"); }} className="px-8 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 transition-colors">Batal</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Manajemen Karyawan</h3>
            <button onClick={() => { setEditEmployee(null); setName(""); setPosition(""); setShift(""); setMode("add"); }} className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-200 flex gap-2 items-center"><PlusSquare size={18} /> Tambah Karyawan</button>
          </div>
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                <th className="pb-4">Karyawan</th>
                <th className="pb-4">Posisi & Shift</th>
                <th className="pb-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {employees.map((emp: any) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="py-4 flex gap-4 items-center">
                    <img src={`https://ui-avatars.com/api/?name=${emp.name}&background=10b981&color=fff`} className="w-12 h-12 rounded-full" alt="avatar" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{emp.name}</p>
                      <span className="text-xs font-mono text-slate-400">{emp.id}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="font-medium">{emp.position}</p>
                    <p className="text-sm text-slate-500">{emp.shift}</p>
                  </td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    <button onClick={() => startEdit(emp)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg"><Edit size={18} /></button>
                    <button onClick={() => onDeleteEmployee(emp.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
