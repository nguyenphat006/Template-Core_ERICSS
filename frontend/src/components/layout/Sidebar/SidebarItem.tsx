"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/lib/types/sidebar.types";
import { useSidebar } from "@/lib/context/SidebarContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  item: MenuItem;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const { isExpanded, setActiveItem } = useSidebar();
  const pathname = usePathname();

  const isActive = item.path === pathname || 
    (item.submenu?.some(subItem => subItem.path === pathname));

  const handleClick = () => {
    if (item.submenu) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else if (item.path) {
      setActiveItem(item.path);
    }
  };

  return (
    <div className="relative">
      {item.submenu ? (
        <div
          onClick={handleClick}
          className={cn(
            "flex items-center gap-3 px-4 py-3.5 rounded-lg cursor-pointer transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            isActive && "bg-gray-100 dark:bg-gray-800",
            !isExpanded && "justify-center"
          )}
        >
          {item.icon && (
            <item.icon
              className={cn(
                "w-5 h-5",
                isActive ? "text-[#6B7AE9]" : "text-gray-500"
              )}
            />
          )}
  
          {isExpanded && (
            <>
              <span
                className={cn(
                  "flex-1",
                  isActive ? "text-[#6B7AE9] font-medium" : "text-black dark:text-gray-300"
                )}
              >
                {item.title}
              </span>
  
              {item.badge && (
                <span className="px-2 py-1 text-xs font-medium text-white bg-[#6B7AE9] rounded-full">
                  {item.badge}
                </span>
              )}
  
              <MdKeyboardArrowDown
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isSubmenuOpen && "rotate-180"
                )}
              />
            </>
          )}
        </div>
      ) : (
        <Link
          key={item.path}
          href={item.path || ""}
          className={cn(
            "flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            isActive && "bg-gray-100 dark:bg-gray-800",
            !isExpanded && "justify-center"
          )}
        >
          {item.icon && (
            <item.icon
              className={cn(
                "w-5 h-5",
                isActive ? "text-[#6B7AE9]" : "text-gray-500"
              )}
            />
          )}
  
          {isExpanded && (
            <>
              <span
                className={cn(
                  "flex-1",
                  isActive ? "text-[#6B7AE9] font-medium" : "text-black dark:text-gray-300"
                )}
              >
                {item.title}
              </span>
  
              {item.badge && (
                <span className="px-2 py-1 text-xs font-medium text-white bg-[#6B7AE9] rounded-full">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </Link>
      )}
  
      {/* Submenu với animation */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-400 ease-in-out",
          isSubmenuOpen && isExpanded ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="pl-4 mt-1 space-y-1">
          {item.submenu?.map((subItem) => (
            <Link
              key={subItem.path}
              href={subItem.path}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-lg transition-all",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === subItem.path && "bg-gray-100 dark:bg-gray-800"
              )}
            >
              {subItem.icon && (
                <subItem.icon
                  className={cn(
                    "w-4 h-4",
                    pathname === subItem.path ? "text-[#6B7AE9]" : "text-gray-500"
                  )}
                />
              )}
              <span
                className={cn(
                  pathname === subItem.path
                    ? "text-[#6B7AE9] font-medium"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {subItem.title}
              </span>
              {subItem.badge && (
                <span className="px-2 py-1 text-xs font-medium text-white bg-[#6B7AE9] rounded-full ml-auto">
                  {subItem.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}; 