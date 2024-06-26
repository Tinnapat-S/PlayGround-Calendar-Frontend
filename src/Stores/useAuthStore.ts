import { create } from 'zustand'
import { clearToken, storeToken, getToken } from '../utilities/local-storage'
import { registerUser, loginUser } from '../services/publicService'
import { setAuthentication } from '../config/axiosPrivate'
import { getMe } from '../services/privateService'

export interface ILogin {
  email: string
  password: string
}

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
  storeToken: (key: string, token: Token) => void
  login: (loginData: ILogin) => void
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

export const useAuthStore = create<AuthState & AuthAction>((set, get) => ({
  ...initialState,
  restoreAuthenticate: async () => {
    const tokenString = getToken('token')

    if (!tokenString) {
      get().logout()
      console.log('logout no token')
      return
    }

    try {
      const storedToken: Token = JSON.parse(tokenString)
      if (storedToken && storedToken.accessToken) {
        const userProfile = await getMe()
        set({
          isAuthenticated: true,
          user: {
            id: userProfile.id,
            username: userProfile.username,
            email: userProfile.email,
            googleId: userProfile.googleId || null,
          },
        })
      }
      console.log('restore pass')
    } catch (error: any) {
      get().logout()
      console.log('logout')
    }
  },
  storeToken: (key: string, token: Token) => {
    storeToken(key, token)
  },
  register: async (email: string, password: string) => {
    try {
      const userData = await registerUser({
        email: email,
        password: password,
      })
      const token = {
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
      }
      setAuthentication(token)
      get().storeToken('token', token)
      set({
        isAuthenticated: true,
        token,
        user: {
          ///no need this user
          id: userData.id,
          username: userData.username,
          email: userData.email,
          googleId: userData.googleId || null,
        },
      })
    } catch (error: any) {
      if (error.response.data.message) {
        alert(error.response.data.message)
      }
      console.log(error)
    }
  },
  login: async (loginData: ILogin) => {
    try {
      const token = await loginUser(loginData)
      get().storeToken('token', token)
      set({
        isAuthenticated: true,
        token: token,
      })
    } catch (err: any) {
      alert('something went wrong please try again later')
    }
  },

  logout: () => {
    clearToken('token')
    set({ ...initialState })
  },
}))
