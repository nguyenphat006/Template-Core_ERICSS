"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/lib/context/SidebarContext";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <main className="min-h-screen transition-all duration-300 ease-in-out lg:pl-20">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
