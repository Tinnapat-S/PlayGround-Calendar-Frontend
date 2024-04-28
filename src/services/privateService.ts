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
  const newObj = { userId: 'cluc9y75f0000scnztuq9mghq', ...newTask[0] }

  const response = await AxiosPrivateInstance.post('/api/tasks', newObj)
  return response.data
  // const response = (await JSON.parse(
  //   JSON.stringify(task)
  // )) as IResponseModalTask[]
  // return response
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

export const deleteTask = async (id: number) => {
  console.log(id)
  // const response = await AxiosPrivateInstance.delete(`/api/tasks/${id}`)
  // return response
  return 'deleted'
}
