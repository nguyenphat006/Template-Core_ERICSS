import { MenuItem } from "../types/sidebar.types";
import { 
  MdDashboard, 
  MdPerson, 
  MdSettings, 
  MdShoppingCart,
  MdBarChart,
  MdEmail,
  MdCalendarToday
} from "react-icons/md";

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: MdDashboard,
  },
  {
    title: "E-commerce",
    icon: MdShoppingCart,
    submenu: [
      {
        title: "Products",
        path: "/dashboard/products",
      },
      {
        title: "Orders",
        path: "/dashboard/orders",
        badge: "New",
      },
      {
        title: "Customers",
        path: "/dashboard/customers",
      },
    ],
  },
  {
    title: "Analytics",
    icon: MdBarChart,
    submenu: [
      {
        title: "Reports",
        path: "/dashboard/reports",
      },
      {
        title: "Statistics",
        path: "/dashboard/statistics",
      },
    ],
  },
  {
    title: "Calendar",
    path: "/dashboard/calendar",
    icon: MdCalendarToday,
  },
  {
    title: "Email",
    path: "/dashboard/email",
    icon: MdEmail,
    badge: 4,
  },
  {
    title: "User Management",
    icon: MdPerson,
    roles: ["admin"],
    submenu: [
      {
        title: "Users",
        path: "/dashboard/users",
      },
      {
        title: "Roles",
        path: "/dashboard/roles",
      },
      {
        title: "Permissions",
        path: "/dashboard/permissions",
      },
    ],
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: MdSettings,
  },
]; 