import { Token } from '../stores/useAuthStore'
export const storeToken = (key: string, token: Token) => {
  localStorage.setItem(key, JSON.stringify(token))
}

export const clearToken = (key: string) => {
  localStorage.removeItem(key)
}

export const getToken = (key: string) => localStorage.getItem(key)
