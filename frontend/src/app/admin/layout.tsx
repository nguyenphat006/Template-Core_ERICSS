"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/lib/context/SidebarContext";
import { PageTitleProvider } from "@/lib/context/PageTitleContext";
import { useSidebar } from "@/lib/context/SidebarContext";
import { cn } from "@/lib/utils";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Header />
      <main 
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out pt-20",
          {
            "lg:ml-80": isExpanded && !isMobileOpen,
            "lg:ml-24": !isExpanded && !isMobileOpen,
            "ml-0": !isMobileOpen,
            "ml-80": isMobileOpen
          }
        )}
      >
        <div className="p-4 md:p-6 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PageTitleProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </PageTitleProvider>
    </SidebarProvider>
  );
}
