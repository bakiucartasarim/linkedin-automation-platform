export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface N8nCredentialsData {
  webhookUrl: string
  authToken?: string
  webhookSecret?: string
}