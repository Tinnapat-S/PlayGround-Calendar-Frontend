import AxiosPrivateInstance from '../config/axiosPrivate'

export const getMe = async () => {
  const response = await AxiosPrivateInstance.get('api/me')
  return response.data
}

export const getAccessToken = async (): Promise<any> => {
  const response = await AxiosPrivateInstance.get('api/refreshAccessToken')
  return response.data
}
