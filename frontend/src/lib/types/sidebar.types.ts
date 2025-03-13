import { IconType } from "react-icons";

export type SubMenuItem = {
  title: string;
  path: string;
  icon?: IconType;
  badge?: string | number;
  roles?: string[];
};

export type MenuItem = {
  title: string;
  path?: string;
  icon?: IconType;
  badge?: string | number;
  roles?: string[];
  submenu?: SubMenuItem[];
  isOpen?: boolean;
};

export type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  activeItem: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setActiveItem: (item: string | null) => void;
}; 