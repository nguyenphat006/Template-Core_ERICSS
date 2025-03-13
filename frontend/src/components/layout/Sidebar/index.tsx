"use client";

import React from "react";
import { useSidebar } from "@/lib/context/SidebarContext";
import { menuItems } from "@/lib/config/menuConfig";
import { SidebarItem } from "./SidebarItem";
import { MdMenu } from "react-icons/md";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Sidebar = () => {
  const { isExpanded, toggleSidebar, isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
          "transition-all duration-300 ease-in-out",
          "lg:translate-x-0",
          isExpanded ? "w-72" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            {isExpanded ? (
              <Image
                src="/img/logo/logo-ericss.png"
                alt="Logo"
                width={120}
                height={30}
                className="dark:hidden"
              />
            ) : (
              <Image
                src="/img/logo/logo-ericss.png"
                alt="Logo"
                width={30}
                height={30}
                className="dark:hidden"
              />
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Toggle Sidebar"
          >
            <MdMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 p-4 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </nav>

        {/* Footer */}
        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo/logo-avat.png"
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Toggle Button (Mobile) */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed bottom-4 right-4 p-3 bg-primary text-white rounded-full shadow-lg lg:hidden"
        aria-label="Toggle Mobile Menu"
      >
        <MdMenu className="w-6 h-6" />
      </button>
    </>
  );
}; 