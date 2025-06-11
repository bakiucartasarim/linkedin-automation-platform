export interface ContentCreationRequest {
  type: 'auto' | 'user_image' | 'user_text' | 'text_only'
  userInput?: {
    text?: string
    imageFile?: File
    imageUrl?: string
  }
}

export interface ContentSuggestionResponse {
  success: boolean
  suggestion: {
    type: 'image' | 'text'
    content: string | ImageSuggestion
  }
  sessionId: string
}

export interface ImageSuggestion {
  url: string
  description: string
  prompt: string
}

export interface PublishRequest {
  sessionId: string
  scheduleDate?: Date
  immediate?: boolean
}