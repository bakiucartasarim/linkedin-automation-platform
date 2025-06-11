'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, LogOut } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linkedin-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">SH</span>
            </div>
            <span className="text-xl font-bold">SocialHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/dashboard/content-creation" className="text-gray-600 hover:text-gray-900">
              İçerik Oluştur
            </Link>
            <Link href="/dashboard/history" className="text-gray-600 hover:text-gray-900">
              Paylaşım Geçmişi
            </Link>
            <Link href="/dashboard/settings" className="text-gray-600 hover:text-gray-900">
              Ayarlar
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {session?.user && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{session.user.name || session.user.email}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut()}
              className="flex items-center space-x-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}