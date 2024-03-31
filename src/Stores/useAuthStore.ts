import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/localStorageKey'
import { create } from 'zustand'
import { clearToken, storeToken, getToken } from '../utilities/local-storage'
import { registerUser } from '../services/publicService'
import { setAuthentication } from '../config/axiosPrivate'
import { useApplicationStore } from './useStore'

interface IUser {
  id: string
  username: string
  email: string
  googleId: string | null
}

type AuthState = {
  isAuthenticated: boolean
  user: IUser | null
  token: {
    accessToken: string | null
    refreshToken: string | null
  }
}
// check if authenticated true  if not =>
// redirect to calendar         redirect to login

//if not authenticated call api/user/me to get user
type AuthAction = {
  restoreAuthenticate: () => void
  storeToken: (key: string, token: string) => void
  login: (email: string, password: string) => void
  register: (email: string, password: string) => void
  logout: () => void
}

export type Token = {
  accessToken: string | null
  refreshToken: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: ({} as Token) || null,
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  ...initialState,
  restoreAuthenticate: () => {
    //wait this
    const accessToken = getToken(ACCESS_TOKEN)
    const refreshToken = getToken(REFRESH_TOKEN)
    if (accessToken && refreshToken) {
      set({ isAuthenticated: true, token: { accessToken, refreshToken } })
    }
  },
  storeToken: (key: string, token: string) => {
    storeToken(key, token)
  },
  register: async (email: string, password: string) => {
    const { setLoading } = useApplicationStore.getState()
    setLoading(true)
    try {
      const userData = await registerUser({
        username: email,
        password: password,
      })
      const token = {
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
      }
      setAuthentication(token)

      set({
        isAuthenticated: true,
        token,
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          googleId: userData.googleId || null,
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  },
  login: (email: string, password: string) => {
    console.log('login', email, password)
  },

  logout: () => {
    clearToken(ACCESS_TOKEN)
    clearToken(REFRESH_TOKEN)
    set({ ...initialState })
  },
}))
