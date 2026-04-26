"use client";

import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Search, ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div className="left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Toko Perlengkapan
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Beli alat kebersihan tambahan berkualitas tinggi.</p>
        </div>

        <div className="w-full md:w-[400px] flex items-center h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
          <div className="pl-4 text-slate-400">
            <Search size={20} />
          </div>
          <input
            type="search"
            placeholder="Cari barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-3 h-full border-none bg-transparent outline-none w-full text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <li
            key={item.id}
            className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col items-center gap-4 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
          >
            <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 transition-colors group-hover:bg-emerald-50 dark:group-hover:bg-slate-700">
              <img
                src={item.image.startsWith("http") ? item.image : `/images/shop/${item.image}`}
                alt={item.name}
                className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300?text=Produk+Habis+Gambar";
                }}
              />
            </div>
            
            <div className="flex-1 flex flex-col justify-between w-full h-full">
              <div className="flex text-left flex-col w-full">
                <h3 className="text-slate-800 dark:text-slate-100 font-bold text-md leading-tight line-clamp-2 min-h-[40px]">
                  {item.name}
                </h3>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <span className="font-extrabold text-lg text-emerald-600 dark:text-emerald-400 text-left">
                  Rp{item.price.toLocaleString("id-ID")}
                </span>
                <button
                  onClick={() => { addToCart({ id: item.id, name: item.name, price: item.price, type: "product", image: item.image }); toast(`${item.name} ditambahkan!`, "success"); }}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-2.5 rounded-xl font-bold hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Tambah
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {filteredProducts.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-slate-400">
          <Search size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">Barang tidak ditemukan.</p>
        </div>
      )}
    </PageLayout>
  );
}
