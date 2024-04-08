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

export const getAllTask = async (): Promise<any> => {
  //const response = await AxiosPrivateInstance.get('/api/tasks')
  const today = new Date()
  const todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
  const tomorrow = new Date(todayStr).setDate(today.getDate() + 1)
  const nextDay = new Date(tomorrow).toISOString().replace(/T.*$/, '')
  return [
    {
      id: '0',
      title: 'Timed event',
      start: todayStr + 'T00:00:00',
      // end: nextDay + 'T12:00:00',
      isEnd: true,
    },
    {
      id: '1',
      title: 'Test work',
      start: todayStr + 'T14:00:00',
      end: nextDay + 'T12:00:00',
      color: 'red',
      textColor: 'white',
    },
    {
      id: '2',
      title: 'Timed event',
      start: todayStr + 'T14:00:00',
      end: nextDay + 'T11:00:00',
    },
  ]
}
