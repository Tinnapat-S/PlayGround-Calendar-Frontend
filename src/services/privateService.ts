import AxiosPrivateInstance from '../config/axiosPrivate'

export const getMe = async () => {
  try {
    const response = await AxiosPrivateInstance.get('/api/users/profile')
    return response.data
  } catch (error) {
    console.log(error, 'getMe not pass')
  }
}

export const getNewAccessToken = async (): Promise<any> => {
  const response = await AxiosPrivateInstance.get('api/auth/refresh')
  return response.data
}
