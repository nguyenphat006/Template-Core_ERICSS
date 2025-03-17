"use client";

import React from "react";
import { MdMenu } from "react-icons/md";
import { useSidebar } from "@/lib/context/SidebarContext";
import { usePageTitle } from "@/lib/context/PageTitleContext";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isExpanded, toggleSidebar, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const { title, subtitle } = usePageTitle();

  return (
    <header className={cn(
      "fixed top-0 z-40 h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800",
      "transition-all duration-300 ease-in-out",
      "right-0",
      {
        "lg:left-80": isExpanded && !isMobileOpen,
        "lg:left-24": !isExpanded && !isMobileOpen,
        "left-0 lg:left-24": !isMobileOpen && !isExpanded,
        "left-0 lg:left-80": isExpanded && !isMobileOpen,
        "left-80": isMobileOpen,
        "left-0": !isMobileOpen
      }
    )}>
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden lg:block"
            aria-label="Toggle Sidebar"
          >
            <MdMenu className="w-6 h-6 text-gray-500" />
          </button>
          <button
            onClick={toggleMobileSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            aria-label="Toggle Mobile Sidebar"
          >
            <MdMenu className="w-6 h-6 text-gray-500" />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <Image
              src="/img/logo/logo-avat.png"
              alt="User"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                john@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 