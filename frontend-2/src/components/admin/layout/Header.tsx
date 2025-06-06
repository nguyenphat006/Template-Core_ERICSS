'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Bell,
  Search,
  Settings,
  User,
  ChevronDown,
  Store,
  Globe,
  LogOut,
  Menu,
  Check,
} from 'lucide-react'
import { useResponsive } from '@/hooks/useResponsive'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { useLogout } from '@/hooks/useLogout'
import { Button } from '@/components/ui/button'
import { useChangeLang } from '@/hooks/useChangeLang'
import { SearchItem } from './SearchItem'
import { useTranslation } from 'react-i18next'
import { ProfileSetting } from './ProfileSetting'
import { NotificationSheet } from './Notification-Sheet'
import { useState } from 'react'

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { isMobile } = useResponsive()
  const { handleLogout, loading: logoutLoading } = useLogout()
  const { changeLanguage, currentLangName, currentSelectedLang } = useChangeLang()
  const { t } = useTranslation()
  const [notificationOpen, setNotificationOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 h-16 z-30">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Logo + Hamburger */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button onClick={onToggleSidebar} className="text-gray-700 bg-white">
              <Menu className="w-6 h-6" />
            </Button>
          )}
          <Link href="/admin" className="items-center hidden lg:flex">
            <Image
              src="/images/Highlands_Coffee_logo.png"
              alt="Shopsifu Logo"
              width={60} // gấp đôi nếu ảnh nhỏ
              height={132}
              className="mr-2 object-cover"
              unoptimized
              priority
            />
          </Link>
        </div>

        {/* Search bar */}
        {!isMobile && (
          <SearchItem />
        )}

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <Button className="p-2 rounded-full hover:bg-gray-100 relative bg-[#fff]" onClick={() => setNotificationOpen(true)} aria-label={t('admin.notifications.title')}>
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-600 rounded-full w-2 h-2"></span>
          </Button>

          <ProfileSetting />
          <NotificationSheet open={notificationOpen} onOpenChange={setNotificationOpen} />
        </div>
      </div>
    </header>
  )
}