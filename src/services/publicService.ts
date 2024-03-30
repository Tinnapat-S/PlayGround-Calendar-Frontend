import axios from '../config/axiosPublic'

export interface IRegisterUserPayload {
  username: string | undefined
  password: string | undefined
}

export const registerUser = async (data: IRegisterUserPayload) => {
  const response = await axios.post('/register', data)
  return response.data
}

export const loginUser = async (data: IRegisterUserPayload) => {
  const response = await axios.post('/login', data)
  return response.data
}
