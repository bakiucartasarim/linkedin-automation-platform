import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function getPostStatusColor(status: string): string {
  switch (status) {
    case 'DRAFT': return 'bg-gray-100 text-gray-800'
    case 'SCHEDULED': return 'bg-blue-100 text-blue-800'
    case 'PUBLISHED': return 'bg-green-100 text-green-800'
    case 'FAILED': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export function getPostStatusText(status: string): string {
  switch (status) {
    case 'DRAFT': return 'Taslak'
    case 'SCHEDULED': return 'Zamanlandı'
    case 'PUBLISHED': return 'Yayınlandı'
    case 'FAILED': return 'Başarısız'
    default: return 'Bilinmiyor'
  }
}