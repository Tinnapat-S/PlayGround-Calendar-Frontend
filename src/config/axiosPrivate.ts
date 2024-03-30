import axios from 'axios'
import { getToken } from '../utilities/local-storage'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

export default axios
