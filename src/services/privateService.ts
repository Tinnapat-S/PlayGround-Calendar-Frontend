import AxiosPrivateInstance from '../config/axiosPrivate'

export const getMe = async (): Promise<any> => {
  try {
    const response = await AxiosPrivateInstance.get('/api/users/profile')
    return response.data
  } catch (error) {
    console.log(error, 'getMe not pass')
  }
}

import {
  IResponseModalTask,
  IRequestModalTask,
} from '../components/forms/Task/type'
import task from './task.json'

export const getAllTask = async (): Promise<IResponseModalTask[]> => {
  //const response = await AxiosPrivateInstance.get('/api/tasks')
  //return response.data
  const response = (await JSON.parse(
    JSON.stringify(task)
  )) as IResponseModalTask[]
  return response
}

export const addTask = async (newTask: IRequestModalTask[]) => {
  console.log(newTask)
  // const response = await AxiosPrivateInstance.post('/api/tasks', task)
  // return response.data
  const response = (await JSON.parse(
    JSON.stringify(task)
  )) as IResponseModalTask[]
  return response
}
interface IUpdateTask {
  id: number
  //userId: string,
  title: string
  content: string
  type: number[]
  startAt: Date
  endAt: Date
}

export const updateTask = async (updateTask: IUpdateTask) => {
  // const response = await AxiosPrivateInstance.patch('api/tasks', updateTask)
  // return response
  return updateTask
}
