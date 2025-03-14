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
          "fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
          "transition-all duration-300 ease-in-out",
          "lg:translate-x-0",
          isExpanded ? "w-80" : "w-24",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center w-full">
            {isExpanded ? (
              <Image
                src="/img/logo/logo-ericss.png"
                alt="Logo"
                width={140}
                height={35}
                className="dark:hidden"
              />
            ) : (
              <Image
                src="/img/logo/logo-ericss.png"
                alt="Logo"
                width={35}
                height={35}
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

        {/* Menu Items with Sections */}
        <nav className="flex flex-col gap-8 p-6 overflow-y-auto">
          {menuItems.map((section, index) => (
            <div key={section.sectionTitle} className="flex flex-col gap-4">
              {isExpanded && (
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.sectionTitle}
                </h3>
              )}
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <SidebarItem key={item.title} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <Image
                src="/img/logo/logo-avat.png"
                alt="User"
                width={45}
                height={45}
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
        className="fixed bottom-4 right-4 p-3 bg-[#6B7AE9] text-white rounded-full shadow-lg lg:hidden"
        aria-label="Toggle Mobile Menu"
      >
        <MdMenu className="w-6 h-6" />
      </button>
    </>
  );
}; 