import AxiosPublicInstance from '../config/axiosPublic'
import { Token } from '../stores/useAuthStore'

export const refreshToken = async (token: Token) => {
  return await AxiosPublicInstance.post<Token>('api/auth/refresh', {
    refreshToken: token.refreshToken,
  })
}
