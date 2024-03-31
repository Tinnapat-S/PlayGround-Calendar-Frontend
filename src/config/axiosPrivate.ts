import axios, { AxiosResponse, AxiosError } from 'axios'
import { Token } from '../stores/useAuthStore'
import { refreshToken } from '../services/authService'

const AxiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

// Set the AUTH token for any request
AxiosPrivateInstance.interceptors.request.use((config) => {
  const token: Token | null = JSON.parse(
    localStorage.getItem('token') || 'null'
  )
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token.accessToken}` : ''
  }
  return config
})

// Add a response interceptor
AxiosPrivateInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401 && error.config) {
      const token: Token | null = JSON.parse(
        localStorage.getItem('token') || 'null'
      )
      if (token && token.refreshToken) {
        try {
          const res = await refreshToken(token)
          if (res.status === 200) {
            localStorage.setItem('token', JSON.stringify(res.data))
            AxiosPrivateInstance.defaults.headers.common.Authorization =
              'Bearer ' + res.data.accessToken
            console.log(error.config)
            return await AxiosPrivateInstance(error.config)
          }
        } catch (err) {
          clearAuthentication()
          console.log(err)
        }
      }
    }
    return Promise.reject(error)
  }
)

export const setAuthentication = (token: Token) => {
  if (token) {
    AxiosPrivateInstance.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`
  } else {
    clearAuthentication()
  }
}
export function clearAuthentication(): void {
  localStorage.removeItem('token')
  AxiosPrivateInstance.defaults.headers.common['Authorization'] = ''
}

export default AxiosPrivateInstance
