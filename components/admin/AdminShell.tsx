"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Sidebar } from "./Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f6f0]">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/45"
          />

          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw]">
            <Sidebar
              className="h-full w-full shadow-2xl"
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/5 bg-[#f8f6f0]/95 px-4 backdrop-blur md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-hbf-dark"
          >
            <Menu size={20} />
          </button>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-hbf-dark">Admin Menu</p>
          <div className="h-10 w-10" />
        </header>

        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6 md:py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
