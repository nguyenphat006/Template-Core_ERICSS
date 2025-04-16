"use client";

import { useEffect } from "react";
import { usePageTitle } from "@/lib/context/PageTitleContext";
import { usePathname } from "next/navigation";

// Map các đường dẫn đến tiêu đề trang
const pathToTitle: Record<string, { title: string; subtitle?: string }> = {
  "/admin/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back to your dashboard"
  },
  "/admin/product": {
    title: "Products",
    subtitle: "Manage your product inventory"
  },
  "/admin/orders": {
    title: "Orders",
    subtitle: "Track and manage customer orders"
  },
  "/admin/customers": {
    title: "Customers",
    subtitle: "View and manage your customer base"
  },
  "/admin/reports": {
    title: "Reports",
    subtitle: "Analyze your business performance"
  },
  "/admin/statistics": {
    title: "Statistics",
    subtitle: "View detailed analytics and metrics"
  },
  "/admin/calendar": {
    title: "Calendar",
    subtitle: "Schedule and manage your events"
  },
  "/admin/email": {
    title: "Email",
    subtitle: "Manage your email communications"
  },
  "/admin/users": {
    title: "Users",
    subtitle: "Manage system users and permissions"
  },
  "/admin/roles": {
    title: "Roles",
    subtitle: "Configure user roles and access levels"
  },
  "/admin/permissions": {
    title: "Permissions",
    subtitle: "Set up system permissions"
  },
  "/admin/settings": {
    title: "Settings",
    subtitle: "Configure your application settings"
  },
  "/admin/projects": {
    title: "Projects",
    subtitle: "Manage your ongoing projects"
  },
  "/admin/tasks": {
    title: "Tasks",
    subtitle: "Track and manage your tasks"
  },
  "/admin/documents": {
    title: "Documents",
    subtitle: "Access and manage your documents"
  }
};

/**
 * Hook để tự động cập nhật tiêu đề trang dựa trên đường dẫn hiện tại
 * hoặc cho phép đặt tiêu đề tùy chỉnh
 */
export const useSetPageTitle = (customTitle?: string, customSubtitle?: string) => {
  const { setPageTitle } = usePageTitle();
  const pathname = usePathname();

  useEffect(() => {
    // Nếu có tiêu đề tùy chỉnh, sử dụng nó
    if (customTitle) {
      setPageTitle(customTitle, customSubtitle);
      return;
    }

    // Nếu không, tìm tiêu đề dựa trên đường dẫn
    const pageInfo = pathToTitle[pathname];
    if (pageInfo) {
      setPageTitle(pageInfo.title, pageInfo.subtitle);
    } else {
      // Trích xuất tiêu đề từ đường dẫn nếu không tìm thấy trong map
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1];
        const formattedTitle = lastSegment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setPageTitle(formattedTitle);
      } else {
        // Fallback nếu không thể trích xuất
        setPageTitle("Dashboard");
      }
    }
  }, [pathname, customTitle, customSubtitle, setPageTitle]);

  return { setPageTitle };
}; 