"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  isExpanded: boolean;
  isMobileOpen: boolean;
  activeItem: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setActiveItem: (path: string) => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra nếu là mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Đóng sidebar khi chuyển sang mobile
  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
      setIsMobileOpen(false);
    } else {
      setIsExpanded(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  const toggleMobileSidebar = () => {
    // Khi mở mobile sidebar, luôn mở full thông tin
    if (!isMobileOpen) {
      setIsExpanded(true);
    }
    setIsMobileOpen(!isMobileOpen);
  };

  const expandSidebar = () => {
    if (!isMobile) {
      setIsExpanded(true);
    }
  };

  const collapseSidebar = () => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        isMobileOpen,
        activeItem,
        toggleSidebar,
        toggleMobileSidebar,
        setActiveItem,
        expandSidebar,
        collapseSidebar,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
