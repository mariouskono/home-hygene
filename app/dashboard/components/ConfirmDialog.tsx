"use client";

import { Trash2 } from "lucide-react";

interface ConfirmDialogProps {
  dialog: { title: string; msg: string; onConfirm: () => void } | null;
  onClose: () => void;
}

export default function ConfirmDialog({ dialog, onClose }: ConfirmDialogProps) {
  if (!dialog) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 text-center border border-slate-100 dark:border-slate-800">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-4">
           <Trash2 size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{dialog.title}</h3>
        <p className="text-slate-500 mb-6">{dialog.msg}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Batal</button>
          <button 
            onClick={() => { 
              dialog.onConfirm(); 
              onClose(); 
            }} 
            className="flex-1 px-4 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
          >Tetapkan Perintah</button>
        </div>
      </div>
    </div>
  );
}
