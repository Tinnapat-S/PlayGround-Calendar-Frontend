import axiosPublic from '../config/axiosPublic'

export interface IRegisterUserPayload {
  email: string
  password: string
}
interface IRegisterResponse {
  id: string
  email: string
  username: string
  googleId: string | null
  createdAt: string
  updatedAt: string
  accessToken: string
  refreshToken: string
}

export const registerUser = async (
  data: IRegisterUserPayload
): Promise<IRegisterResponse> => {
  const response = await axiosPublic.post('/api/auth/signup', data)
  return response.data
  //const response = await axios.post('api/signup', data)
}

export const loginUser = async (data: IRegisterUserPayload) => {
  const response = await axiosPublic.post('/api/auth/login', data)
  return response.data
}
