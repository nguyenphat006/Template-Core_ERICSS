"use client";

import React, { createContext, useContext, useState } from "react";

interface PageTitleContextType {
  title: string;
  subtitle: string;
  setPageTitle: (title: string, subtitle?: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export const PageTitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState("Dashboard");
  const [subtitle, setSubtitle] = useState("Welcome back to your dashboard");

  const setPageTitle = (newTitle: string, newSubtitle?: string) => {
    setTitle(newTitle);
    if (newSubtitle) {
      setSubtitle(newSubtitle);
    } else {
      // Tạo subtitle mặc định nếu không được cung cấp
      setSubtitle(`Manage your ${newTitle.toLowerCase()}`);
    }
  };

  return (
    <PageTitleContext.Provider
      value={{
        title,
        subtitle,
        setPageTitle,
      }}
    >
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => {
  const context = useContext(PageTitleContext);
  if (context === undefined) {
    throw new Error("usePageTitle must be used within a PageTitleProvider");
  }
  return context;
}; 