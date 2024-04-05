import axios, { AxiosResponse, AxiosError } from 'axios'
import { Token } from '../stores/useAuthStore'
import { refreshToken } from '../services/authService'
import { getToken, storeToken } from '../utilities/local-storage'

const AxiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

// Set the AUTH token for any request
AxiosPrivateInstance.interceptors.request.use((config) => {
  const token: Token | null = JSON.parse(getToken('token') || 'null')
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
      const token: Token | null = JSON.parse(getToken('token') || 'null')
      if (token && token.refreshToken) {
        try {
          const res = await refreshToken(token)
          if (res.status === 201) {
            const newToken = {
              accessToken: res.data.accessToken,
              refreshToken: token.refreshToken,
            }
            storeToken('token', newToken)
            AxiosPrivateInstance.defaults.headers.common.Authorization =
              'Bearer ' + res.data.accessToken
            return await AxiosPrivateInstance(error.config)
          }
        } catch (err: any) {
          //if not refresh token << check message backend
          if (err.response.data.message === 'Invalid refresh token') {
            clearAuthentication()
          }
          console.log(err, '<<<token error')
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
