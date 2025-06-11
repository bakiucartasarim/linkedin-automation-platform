import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır')
})

export const registerSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır')
})

export const n8nCredentialsSchema = z.object({
  webhookUrl: z.string().url('Geçerli bir webhook URL giriniz'),
  authToken: z.string().optional(),
  webhookSecret: z.string().optional()
})

export const contentCreationSchema = z.object({
  type: z.enum(['auto', 'user_image', 'user_text', 'text_only']),
  userInput: z.object({
    text: z.string().optional(),
    imageUrl: z.string().url().optional()
  }).optional()
})

export const publishSchema = z.object({
  sessionId: z.string(),
  scheduleDate: z.date().optional(),
  immediate: z.boolean().optional()
})