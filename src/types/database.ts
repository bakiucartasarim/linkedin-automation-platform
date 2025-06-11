import { Prisma } from '@prisma/client'

export type UserWithCredentials = Prisma.UserGetPayload<{
  include: { n8nCredentials: true }
}>

export type ContentSessionWithSuggestions = Prisma.ContentSessionGetPayload<{
  include: { 
    suggestions: true,
    user: true,
    post: true
  }
}>

export type LinkedInPostWithUser = Prisma.LinkedInPostGetPayload<{
  include: { user: true }
}>