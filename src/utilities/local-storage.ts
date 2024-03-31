export const storeToken = (key: string, token: string) => {
  localStorage.setItem(key, token)
}

export const clearToken = (key: string) => {
  localStorage.removeItem(key)
}

export const getToken = (key: string) => localStorage.getItem(key)
