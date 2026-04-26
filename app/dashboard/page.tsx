"use client";

import { useEffect, useState, Suspense } from "react";
import PageLayout from "../components/PageLayout";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "../context/ToastContext";

// -- Tab Components (Modular) --
import OverviewTab from "./tabs/OverviewTab";
import FinanceTab from "./tabs/FinanceTab";
import OrdersTab from "./tabs/OrdersTab";
import EmployeesTab from "./tabs/EmployeesTab";
import ProductsTab from "./tabs/ProductsTab";
import UsersTab from "./tabs/UsersTab";
import ConfirmDialog from "./components/ConfirmDialog";

function DashboardContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "overview";
  
  const activeTab = tabParam.startsWith("products") ? "products" : tabParam;
  const productMode = tabParam === "products-add" ? "add" : "list";

  // -- Shared Data State --
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]); 
  
  // -- Product Edit State (needs to persist across tab switches) --
  const [editProduct, setEditProduct] = useState<any>(null);

  // -- Custom Confirm Dialog State --
  const [confirmDialog, setConfirmDialog] = useState<any>(null);

  // -- Central Data Loader --
  const loadData = () => {
    fetch("/api/employees").then((res) => res.json()).then(setEmployees);
    fetch("/api/orders").then((res) => res.json()).then((data) => setOrders(data || []));
    fetch("/api/products").then((res) => res.json()).then(setProducts);
    fetch("/api/users").then((res) => res.json()).then(setUsers);
  };

  useEffect(() => {
    loadData();
  }, []);

  // -- Confirm Helper --
  const askConfirm = (title: string, msg: string, onConfirm: () => void) => {
    setConfirmDialog({ title, msg, onConfirm });
  };

  // -- Order Actions --
  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        toast(`Status order diubah: ${status}`, "success");
        loadData();
      }
    } catch {}
  };

  // -- Product Actions --
  const handleSaveProduct = async (data: { name: string; price: number; description: string; image: string }, editId?: string) => {
    const isEdit = !!editId;
    const url = isEdit ? `/api/products/${editId}` : "/api/products";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast(isEdit ? "Produk diperbarui!" : "Produk diterbitkan!", "success");
      setEditProduct(null);
      router.push("/dashboard?tab=products-list");
      loadData();
    }
  };

  const deleteProduct = async (id: string) => {
    askConfirm("Hapus Produk", "Anda yakin ingin menghapus produk ini selamanya dari toko?", async () => {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadData();
        toast("Produk berhasil dihapus.", "info");
      }
    });
  };

  const startEditProduct = (p: any) => {
    setEditProduct(p);
    router.push("/dashboard?tab=products-add");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -- Employee Actions --
  const handleSaveEmployee = async (data: { name: string; position: string; shift: string }, editId?: string) => {
    const isEdit = !!editId;
    const url = isEdit ? `/api/employees/${editId}` : "/api/employees";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast(isEdit ? "Data karyawan diperbarui!" : "Karyawan baru dipekerjakan!", "success");
      loadData();
    }
  };

  const deleteEmployee = async (id: string) => {
    askConfirm("Pecat Karyawan", "Karyawan ini akan dihapus dari sistem. Lanjutkan?", async () => {
      await fetch(`/api/employees/${id}`, { method: "DELETE" });
      loadData();
      toast("Karyawan telah diberhentikan.", "info");
    });
  };

  return (
    <PageLayout>
      <div className="mb-8 print:mb-4">
        <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-800 dark:text-slate-100 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium print:hidden">Manajemen data terpusat operasional bisnis.</p>
      </div>

      {activeTab === "overview" && (
        <OverviewTab orders={orders} products={products} employees={employees} />
      )}

      {activeTab === "finance" && (
        <FinanceTab orders={orders} />
      )}

      {activeTab === "orders" && (
        <OrdersTab orders={orders} onUpdateStatus={updateOrderStatus} />
      )}

      {activeTab === "employees" && (
        <EmployeesTab 
          employees={employees} 
          onSaveEmployee={handleSaveEmployee} 
          onDeleteEmployee={deleteEmployee} 
        />
      )}

      {activeTab === "products" && (
        <ProductsTab 
          products={products} 
          productMode={productMode} 
          editProduct={editProduct}
          onSaveProduct={handleSaveProduct}
          onDeleteProduct={deleteProduct}
          onStartEditProduct={startEditProduct}
          onCancelEdit={() => { setEditProduct(null); router.push("/dashboard?tab=products-list"); }}
        />
      )}

      {activeTab === "users" && (
        <UsersTab users={users} toast={toast} onReload={loadData} />
      )}

      {/* Reusable Confirm Dialog */}
      <ConfirmDialog dialog={confirmDialog} onClose={() => setConfirmDialog(null)} />

    </PageLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-500 font-bold col-span-full w-full h-screen flex justify-center items-center">Loading Dashboard Data...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
