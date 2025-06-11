import { useState } from 'react'
import { ContentCreationRequest, ContentSuggestionResponse } from '@/types/content'

export function useContentCreation() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<any[]>([])

  const startContentCreation = async (request: ContentCreationRequest) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/content/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error('Content creation failed')
      }

      const data = await response.json()
      setCurrentSession(data.sessionId)
      
      return data
    } finally {
      setIsLoading(false)
    }
  }

  const approveSuggestion = async (suggestionId: string, approved: boolean) => {
    const response = await fetch('/api/content/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ suggestionId, approved })
    })

    if (!response.ok) {
      throw new Error('Approval failed')
    }

    return response.json()
  }

  const publishContent = async (sessionId: string, scheduleDate?: Date) => {
    const response = await fetch('/api/content/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, scheduleDate })
    })

    if (!response.ok) {
      throw new Error('Publishing failed')
    }

    return response.json()
  }

  return {
    isLoading,
    currentSession,
    suggestions,
    startContentCreation,
    approveSuggestion,
    publishContent
  }
}