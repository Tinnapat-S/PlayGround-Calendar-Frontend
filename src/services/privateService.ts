import AxiosPrivateInstance from '../config/axiosPrivate'

export const getMe = async (): Promise<any> => {
  try {
    const response = await AxiosPrivateInstance.get('/api/users/profile')
    return response.data
  } catch (error) {
    console.log(error, 'getMe not pass')
  }
}

import { IResponseModalTask } from '../components/forms/Task/type'
import task from './task.json'

export const getAllTask = async (): Promise<IResponseModalTask[]> => {
  //const response = await AxiosPrivateInstance.get('/api/tasks')
  //return response.data
  const response = (await JSON.parse(
    JSON.stringify(task)
  )) as IResponseModalTask[]
  return response
}
