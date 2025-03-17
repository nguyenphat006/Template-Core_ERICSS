import { MenuItem, MenuSection } from "../types/sidebar.types";
import { 
  MdDashboard, 
  MdPerson, 
  MdSettings, 
  MdShoppingCart,
  MdBarChart,
  MdEmail,
  MdCalendarToday,
  MdBusinessCenter,
  MdLibraryBooks
} from "react-icons/md";

export const menuItems: MenuSection[] = [
  {
    sectionTitle: "Overview",
    items: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: MdDashboard,
      }
    ]
  },
  {
    sectionTitle: "Applications",
    items: [
      {
        title: "E-commerce",
        icon: MdShoppingCart,
        submenu: [
          {
            title: "Products",
            path: "/admin/product",
          },
          {
            title: "Orders",
            path: "/admin/orders",
            badge: "New",
          },
          {
            title: "Customers",
            path: "/admin/customers",
          },
        ],
      },
      {
        title: "Analytics",
        icon: MdBarChart,
        submenu: [
          {
            title: "Reports",
            path: "/admin/reports",
          },
          {
            title: "Statistics",
            path: "/admin/statistics",
          },
        ],
      },
      {
        title: "Calendar",
        path: "/admin/calendar",
        icon: MdCalendarToday,
      },
      {
        title: "Email",
        path: "/admin/email",
        icon: MdEmail,
        badge: 4,
      },
    ]
  },
  {
    sectionTitle: "Business",
    items: [
      {
        title: "Projects",
        icon: MdBusinessCenter,
        submenu: [
          {
            title: "All Projects",
            path: "/admin/projects",
          },
          {
            title: "Tasks",
            path: "/admin/tasks",
          }
        ]
      },
      {
        title: "Documents",
        icon: MdLibraryBooks,
        path: "/admin/documents",
      }
    ]
  },
  {
    sectionTitle: "Administration",
    items: [
      {
        title: "User Management",
        icon: MdPerson,
        roles: ["admin"],
        submenu: [
          {
            title: "Users",
            path: "/admin/users",
          },
          {
            title: "Roles",
            path: "/admin/roles",
          },
          {
            title: "Permissions",
            path: "/admin/permissions",
          },
        ],
      },
      {
        title: "Settings",
        path: "/admin/settings",
        icon: MdSettings,
      },
    ]
  }
]; 