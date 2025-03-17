"use client";

import React, { useRef, useEffect } from "react";
import { useSidebar } from "@/lib/context/SidebarContext";
import { menuItems } from "@/lib/config/menuConfig";
import { SidebarItem } from "./SidebarItem";
import { MdMenu } from "react-icons/md";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MenuItem } from "@/lib/types/sidebar.types";

export const Sidebar = () => {
  const { isExpanded, isMobileOpen, toggleMobileSidebar, expandSidebar, collapseSidebar, isMobile } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Xử lý hover chỉ khi không ở chế độ mobile
  useEffect(() => {
    if (isMobile) return;

    const handleMouseEnter = () => expandSidebar();
    const handleMouseLeave = () => collapseSidebar();

    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener("mouseenter", handleMouseEnter);
      sidebarElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener("mouseenter", handleMouseEnter);
        sidebarElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [expandSidebar, collapseSidebar, isMobile]);

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
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
          "transition-all duration-300 ease-in-out",
          "lg:translate-x-0",
          isExpanded ? "w-80" : "w-24",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
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
          </div>

          {/* Menu Items with Sections */}
          <nav className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-8 p-6">
              {menuItems.map((section, index) => (
                <div key={section.sectionTitle} className="flex flex-col gap-4">
                  {(isExpanded || isMobileOpen) && (
                    <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {section.sectionTitle}
                    </h3>
                  )}
                  <div className="flex flex-col gap-1">
                    {section.items.map((item: MenuItem) => (
                      <SidebarItem key={item.title} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}; 