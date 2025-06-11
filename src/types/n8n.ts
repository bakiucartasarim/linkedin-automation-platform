export interface N8nWebhookPayload {
  action: 'content_suggestion' | 'publish_post' | 'status_update'
  sessionId: string
  userId: string
  data: any
}

export interface N8nContentRequest {
  type: 'image' | 'text'
  context?: {
    existingText?: string
    existingImage?: string
    userPreferences?: Record<string, any>
  }
  sessionId: string
}

export interface N8nPublishRequest {
  content: string
  imageUrl?: string
  scheduleDate?: string
  linkedInCredentials: {
    accessToken: string
  }
  sessionId?: string
}