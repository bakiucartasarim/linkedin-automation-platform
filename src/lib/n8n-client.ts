import axios, { AxiosInstance } from 'axios'
import { prisma } from './db'
import { N8nContentRequest, N8nPublishRequest, N8nWebhookPayload } from '@/types/n8n'

export class N8nClient {
  private axiosInstance: AxiosInstance

  constructor(private userId: string) {
    this.axiosInstance = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async getUserCredentials() {
    const credentials = await prisma.n8nCredentials.findUnique({
      where: { userId: this.userId }
    })

    if (!credentials || !credentials.isActive) {
      throw new Error('n8n credentials not found or inactive')
    }

    return credentials
  }

  async requestContentSuggestion(request: N8nContentRequest) {
    const credentials = await this.getUserCredentials()
    
    const payload: N8nWebhookPayload = {
      action: 'content_suggestion',
      sessionId: request.sessionId,
      userId: this.userId,
      data: {
        type: request.type,
        context: request.context
      }
    }

    try {
      const response = await this.axiosInstance.post(
        credentials.webhookUrl,
        payload,
        {
          headers: credentials.authToken ? {
            'Authorization': `Bearer ${credentials.authToken}`
          } : {}
        }
      )

      await this.logAction('content_suggestion_request', {
        sessionId: request.sessionId,
        type: request.type,
        response: response.status
      })

      return response.data
    } catch (error) {
      await this.logAction('content_suggestion_error', {
        sessionId: request.sessionId,
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'ERROR')
      
      throw error
    }
  }

  async requestPublish(request: N8nPublishRequest) {
    const credentials = await this.getUserCredentials()
    
    const payload: N8nWebhookPayload = {
      action: 'publish_post',
      sessionId: request.sessionId || '',
      userId: this.userId,
      data: request
    }

    try {
      const response = await this.axiosInstance.post(
        credentials.webhookUrl,
        payload,
        {
          headers: credentials.authToken ? {
            'Authorization': `Bearer ${credentials.authToken}`
          } : {}
        }
      )

      await this.logAction('publish_request', {
        content: request.content.substring(0, 100) + '...',
        hasImage: !!request.imageUrl,
        scheduled: !!request.scheduleDate,
        response: response.status
      })

      return response.data
    } catch (error) {
      await this.logAction('publish_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'ERROR')
      
      throw error
    }
  }

  private async logAction(action: string, details: any, level: 'INFO' | 'WARNING' | 'ERROR' = 'INFO') {
    await prisma.systemLog.create({
      data: {
        userId: this.userId,
        action,
        details,
        level
      }
    })
  }
}