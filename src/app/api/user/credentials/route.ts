import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { n8nCredentialsSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = n8nCredentialsSchema.parse(body)

    // Mevcut credentials'ı güncelle veya yeni oluştur
    const credentials = await prisma.n8nCredentials.upsert({
      where: { userId: session.user.id },
      update: {
        webhookUrl: validatedData.webhookUrl,
        authToken: validatedData.authToken,
        webhookSecret: validatedData.webhookSecret,
        isActive: true
      },
      create: {
        userId: session.user.id,
        webhookUrl: validatedData.webhookUrl,
        authToken: validatedData.authToken,
        webhookSecret: validatedData.webhookSecret,
        isActive: true
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Credentials error:', error)
    return NextResponse.json(
      { error: 'Failed to save credentials' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const credentials = await prisma.n8nCredentials.findUnique({
      where: { userId: session.user.id },
      select: {
        webhookUrl: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({ credentials })

  } catch (error) {
    console.error('Get credentials error:', error)
    return NextResponse.json(
      { error: 'Failed to get credentials' },
      { status: 500 }
    )
  }
}