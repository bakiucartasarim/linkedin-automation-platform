'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  Users,
  FileText
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'İçerik Oluştur',
    href: '/dashboard/content-creation',
    icon: PlusCircle
  },
  {
    title: 'Paylaşım Geçmişi',
    href: '/dashboard/history',
    icon: History
  },
  {
    title: 'Ayarlar',
    href: '/dashboard/settings',
    icon: Settings
  }
]

const adminMenuItems = [
  {
    title: 'Kullanıcı Yönetimi',
    href: '/admin/users',
    icon: Users
  },
  {
    title: 'Sistem Logları',
    href: '/admin/logs',
    icon: FileText
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-50 border-r h-screen sticky top-0">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-linkedin-primary text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Admin Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Admin
          </h3>
          <nav className="mt-2 space-y-2">
            {adminMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-linkedin-primary text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}