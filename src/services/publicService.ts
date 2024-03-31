import axios from '../config/axiosPublic'

export interface IRegisterUserPayload {
  username: string
  password: string
}
interface IRegisterResponse {
  data: {
    id: string
    email: string
    username: string
    googleId: string | null
    createdAt: string
    updatedAt: string
    accessToken: string
    refreshToken: string
  }
}
const mock: IRegisterResponse = {
  data: {
    id: 'clufh6v2500009j306bj0g44j',
    email: 'yed@gmail.com',
    username: 'yed@gmail.com',
    googleId: null,
    createdAt: '2024-03-31T12:06:22.397Z',
    updatedAt: '2024-03-31T12:06:22.397Z',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InllZEBnbWFpbC5jb20iLCJpZCI6ImNsdWZoNnYyNTAwMDA5ajMwNmJqMGc0NGoiLCJpYXQiOjE3MTE4ODY3ODIsImV4cCI6MTcxMTg4ODU4Mn0.fQ6NDudPhqqMwIkkYIxbjYXFlm-9N5qiCclIDc7mH1s',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InllZEBnbWFpbC5jb20iLCJpZCI6ImNsdWZoNnYyNTAwMDA5ajMwNmJqMGc0NGoiLCJpYXQiOjE3MTE4ODY3ODIsImV4cCI6MTcxMjQ5MTU4Mn0.6MeVkwkFsjJTcTxl0hPvgAUGvj801X85MEELOZ91Ols',
  },
}

export const registerUser = async (data: IRegisterUserPayload) => {
  console.log(data)
  return mock.data
  //const response = await axios.post('api/signup', data)
}

export const loginUser = async (data: IRegisterUserPayload) => {
  const response = await axios.post('api/login', data)
  return response.data
}
