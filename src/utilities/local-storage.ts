const ACCESS_TOKEN = 'accessToken'

export const storeToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token)
}

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN)
}

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)
