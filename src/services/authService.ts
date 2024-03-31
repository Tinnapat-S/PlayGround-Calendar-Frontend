import AxiosPublicInstance from '../config/axiosPublic'
import { Token } from '../stores/useAuthStore'

export const refreshToken = async (token: Token) => {
  return await AxiosPublicInstance.post<Token>('auth/refresh-token', {
    refreshToken: token.refreshToken,
  })
}
