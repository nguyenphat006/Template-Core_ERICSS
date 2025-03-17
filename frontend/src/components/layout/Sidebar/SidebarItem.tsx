"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/lib/types/sidebar.types";
import { useSidebar } from "@/lib/context/SidebarContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItemProps {
  item: MenuItem;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const { isExpanded, setActiveItem, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  const isActive = item.path === pathname || 
    (item.submenu?.some(subItem => subItem.path === pathname));

  // Tự động mở submenu nếu có item con đang active
  useEffect(() => {
    if (item.submenu?.some(subItem => subItem.path === pathname)) {
      setIsSubmenuOpen(true);
    }
  }, [pathname, item.submenu]);

  const handleClick = () => {
    if (item.submenu) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else if (item.path) {
      setActiveItem(item.path);
    }
  };

  // Xác định nếu submenu nên hiển thị
  const shouldShowSubmenu = item.submenu && isSubmenuOpen && (isExpanded || isMobileOpen);

  return (
    <div className="relative">
      {item.submenu ? (
        <div
          onClick={handleClick}
          className={cn(
            "flex items-center gap-3 px-4 py-3.5 rounded-lg cursor-pointer transition-all",
            "hover:bg-[#F3F4F9] dark:hover:bg-gray-800",
            isActive && "bg-[#F3F4F9] dark:bg-gray-800",
            !isExpanded && !isMobileOpen && "justify-center"
          )}
        >
          {item.icon && (
            <item.icon
              className={cn(
                "w-5 h-5",
                isActive ? "text-[#4F46E5]" : "text-gray-500",
                "transition-colors duration-200"
              )}
            />
          )}
  
          {(isExpanded || isMobileOpen) && (
            <>
              <span
                className={cn(
                  "flex-1 font-medium",
                  isActive ? "text-[#4F46E5]" : "text-gray-700 dark:text-gray-300",
                  "transition-colors duration-200"
                )}
              >
                {item.title}
              </span>
  
              {item.badge && (
                <span className="px-2 py-1 text-xs font-medium text-white bg-[#4F46E5] rounded-full">
                  {item.badge}
                </span>
              )}
  
              <motion.div
                animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <MdKeyboardArrowDown className="w-5 h-5" />
              </motion.div>
            </>
          )}
        </div>
      ) : (
        <Link
          key={item.path}
          href={item.path || ""}
          className={cn(
            "flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all",
            "hover:bg-[#F3F4F9] dark:hover:bg-gray-800",
            isActive && "bg-[#F3F4F9] dark:bg-gray-800",
            !isExpanded && !isMobileOpen && "justify-center"
          )}
        >
          {item.icon && (
            <item.icon
              className={cn(
                "w-5 h-5",
                isActive ? "text-[#4F46E5]" : "text-gray-500",
                "transition-colors duration-200"
              )}
            />
          )}
  
          {(isExpanded || isMobileOpen) && (
            <>
              <span
                className={cn(
                  "flex-1 font-medium",
                  isActive ? "text-[#4F46E5]" : "text-gray-700 dark:text-gray-300",
                  "transition-colors duration-200"
                )}
              >
                {item.title}
              </span>
  
              {item.badge && (
                <span className="px-2 py-1 text-xs font-medium text-white bg-[#4F46E5] rounded-full">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </Link>
      )}
  
      {/* Submenu với Framer Motion */}
      <AnimatePresence initial={false}>
        {shouldShowSubmenu && item.submenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-4 mt-1 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.path}
                  href={subItem.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg transition-all",
                    "hover:bg-[#F3F4F9] dark:hover:bg-gray-800",
                    pathname === subItem.path && "bg-[#F3F4F9] dark:bg-gray-800"
                  )}
                >
                  {subItem.icon && (
                    <subItem.icon
                      className={cn(
                        "w-4 h-4",
                        pathname === subItem.path ? "text-[#4F46E5]" : "text-gray-500",
                        "transition-colors duration-200"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "font-medium",
                      pathname === subItem.path
                        ? "text-[#4F46E5]"
                        : "text-gray-600 dark:text-gray-400",
                      "transition-colors duration-200"
                    )}
                  >
                    {subItem.title}
                  </span>
                  {subItem.badge && (
                    <span className="px-2 py-1 text-xs font-medium text-white bg-[#4F46E5] rounded-full ml-auto">
                      {subItem.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 