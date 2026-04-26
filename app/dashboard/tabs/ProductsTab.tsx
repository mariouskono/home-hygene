"use client";

import { useState } from "react";
import { Edit, Trash2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductsTabProps {
  products: any[];
  productMode: string;
  editProduct: any;
  onSaveProduct: (data: { name: string; price: number; description: string; image: string }, editId?: string) => void;
  onDeleteProduct: (id: string) => void;
  onStartEditProduct: (p: any) => void;
  onCancelEdit: () => void;
}

export default function ProductsTab({ products, productMode, editProduct, onSaveProduct, onDeleteProduct, onStartEditProduct, onCancelEdit }: ProductsTabProps) {
  const router = useRouter();
  const [name, setName] = useState(editProduct?.name || "");
  const [price, setPrice] = useState(editProduct?.price?.toString() || "");
  const [desc, setDesc] = useState(editProduct?.description || "");
  const [img, setImg] = useState(editProduct?.image || "");

  // Sync local state when editProduct changes
  const isEditing = !!editProduct;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProduct({
      name: name || editProduct?.name,
      price: parseInt(price || editProduct?.price),
      description: desc || editProduct?.description,
      image: img || editProduct?.image || "https://via.placeholder.com/300?text=Barang+Toko",
    }, editProduct?.id);
    setName(""); setPrice(""); setDesc(""); setImg("");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm animate-in fade-in duration-300">
      
      {productMode === "add" ? (
        <div className="w-full max-w-2xl mx-auto">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6">{isEditing ? "Ubah Data Produk" : "Tambah Produk Baru Ke Toko"}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input defaultValue={editProduct?.name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nama Produk/Layanan" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
            <input defaultValue={editProduct?.price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Harga Jual (Rp)" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
            <input defaultValue={editProduct?.image} onChange={(e) => setImg(e.target.value)} type="text" placeholder="URL Gambar Produk (opsional)" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            <textarea defaultValue={editProduct?.description} onChange={(e) => setDesc(e.target.value)} placeholder="Deskripsi Barang" rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required></textarea>
            <div className="flex gap-4 mt-2">
              <button type="submit" className="flex-1 bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 transition-all flex justify-center items-center gap-2"><Save size={18} /> {isEditing ? "Simpan Perubahan" : "Terbitkan Produk"}</button>
              {isEditing && <button type="button" onClick={onCancelEdit} className="px-8 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 transition-colors">Batal</button>}
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6">Etalase Toko ({products.length} Barang)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <div key={p.id} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors">
                {p.image && <img src={p.image.startsWith("http") ? p.image : `/images/shop/${p.image}`} alt={p.name} className="w-full h-48 object-cover rounded-xl mb-5 shadow-sm" />}
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1">{p.name}</h4>
                <p className="text-emerald-600 dark:text-emerald-400 font-black text-xl mb-3">Rp{p.price.toLocaleString("id-ID")}</p>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2">{p.description}</p>
                
                <div className="mt-auto flex gap-3">
                  <button onClick={() => onStartEditProduct(p)} className="flex-1 bg-blue-50 text-blue-600 dark:bg-blue-900/40 py-2.5 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2"><Edit size={16}/> Edit Data</button>
                  <button onClick={() => onDeleteProduct(p.id)} className="flex-1 bg-red-50 text-red-600 dark:bg-red-900/40 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"><Trash2 size={16}/> Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
