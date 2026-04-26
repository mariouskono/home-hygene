"use client";

import PageLayout from "../components/PageLayout";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Brush, BedDouble, TreePine, Bath, WashingMachine, PlusCircle } from "lucide-react";

const PACKAGES = [
  { id: "PKG-A", name: "Paket A (Sapu & Pel Per Lantai)", price: 150000, icon: Brush, desc: "Membersihkan lantai secara menyeluruh" },
  { id: "PKG-B", name: "Paket B (A + Vakum Kasur/Sofa)", price: 250000, icon: BedDouble, desc: "Paket A ditambah deep cleaning kasur/sofa" },
  { id: "PKG-C", name: "Paket C (A + Taman)", price: 300000, icon: TreePine, desc: "Paket A ditambah merapikan halaman/taman" },
  { id: "PKG-D", name: "Paket D (A + WC & Dapur)", price: 350000, icon: Bath, desc: "Pembersihan total area basah" },
  { id: "PKG-E", name: "Paket E (A + Cuci Baju)", price: 400000, icon: WashingMachine, desc: "Paket all-in pembersihan dan laundry" }
];

export default function HomePage() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <PageLayout>
      <div className="flex items-center justify-between gap-[16px] flex-wrap mb-8">
        <div className="left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Layanan Pembersihan
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Pilih paket kebersihan sesuai kebutuhan ruang Anda.</p>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => (
          <li key={pkg.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 min-w-[64px] rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <pkg.icon size={32} strokeWidth={2} />
              </div>
              <div className="info">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {pkg.name.split(" (")[0]}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1 bg-slate-100 dark:bg-slate-800 inline-block px-2 py-1 rounded-full">
                  {pkg.name.split(" (")[1].replace(")", "")}
                </p>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm">{pkg.desc}</p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800 gap-4">
               <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xl">
                 Rp{pkg.price.toLocaleString("id-ID")}
               </span>
               <button 
                 onClick={() => { addToCart({ id: pkg.id, name: pkg.name, price: pkg.price, type: "package" }); toast(`${pkg.name.split(" (")[0]} ditambahkan!`, "success"); }}
                 className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-bold hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-white transition-colors flex items-center justify-center gap-2"
               >
                 <PlusCircle size={18} />
                 Pesan
               </button>
            </div>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
