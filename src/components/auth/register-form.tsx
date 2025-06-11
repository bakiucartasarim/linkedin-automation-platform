'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'
import Link from 'next/link'

type RegisterFormData = {
  name: string
  email: string
  password: string
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { addToast } = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        addToast({
          message: 'Hesabınız başarıyla oluşturuldu! Giriş yapabilirsiniz.',
          type: 'success'
        })
        router.push('/login')
      } else {
        const error = await response.json()
        addToast({
          message: error.message || 'Kayıt sırasında bir hata oluştu.',
          type: 'error'
        })
      }
    } catch (error) {
      addToast({
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-linkedin-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">SH</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Hesap oluşturun
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            LinkedIn içerik otomasyon platformuna katılın
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Ad Soyad
                </label>
                <Input
                  {...register('name')}
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="mt-1"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Adresi
                </label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="ornek@firma.com"
                  className="mt-1"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="En az 6 karakter"
                  className="mt-1"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Zaten hesabınız var mı?{' '}
                <Link href="/login" className="font-medium text-linkedin-primary hover:text-linkedin-dark">
                  Giriş yapın
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}