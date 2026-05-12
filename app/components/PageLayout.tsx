"use client";

import { useState, useEffect, Suspense } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Desktop: sidebar starts open. Mobile: starts closed.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [role, setRole] = useState("user");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/(^| )role=([^;]+)/);
    if (match) setRole(match[2]);
    
    // On mobile, start with sidebar closed
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isAdmin = role.startsWith("admin");

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-200 dark:selection:bg-emerald-900 pb-16 md:pb-0">
      {/* Mobile overlay backdrop - only appears on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1900] md:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - always rendered, visibility controlled by isOpen prop */}
      <Suspense fallback={null}>
        <Sidebar isOpen={isSidebarOpen} />
      </Suspense>

      {/* Main content area - shifts right when sidebar is open on desktop */}
      <div
        className={`relative transition-all duration-300 ease-in-out w-full ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="w-full p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Nav visible ONLY on mobile for non-admins */}
      {mounted && !isAdmin && <BottomNav />}
    </div>
  );
}
