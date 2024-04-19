import { create } from 'zustand'
import * as taskServices from '../services/privateService'
import dayjs, { Dayjs } from 'dayjs'
import { color } from '../constants/colorSidebar'

export interface ITask {
  //form render
  id?: string
  start: Date
  end: Date
  title: string
  content: string
  completed?: boolean
  type?: string
  color?: string
}

interface TaskState {
  tasks: ITask[]
  isOpen: boolean
  event: ITask | null
}

type TaskActions = {
  setOpen: (isOpen: boolean) => void
  getTask: () => void
  addTask: (task: ITask[]) => void
  updateTask: (updateTask: ITask) => void
  deleteTask: (id: number) => void
  setEvent: (currentEvent?: ITask) => void
}

const initialState: TaskState = {
  tasks: [],
  isOpen: false,
  event: null,
}

export const useTaskStore = create<TaskState & TaskActions>((set, get) => ({
  ...initialState,
  setOpen: (status: boolean) => {
    set({ isOpen: status })
  },
  getTask: async () => {
    try {
      const tasks = await taskServices.getAllTask()
      const transformData = tasks.map((task) => {
        return {
          id: task.id.toString(),
          start: dayjs(task.startAt).startOf('minute').toDate(),
          end: dayjs(task.endAt).toDate(),
          title: task.title,
          content: task.content,
          completed: task.completed,
          type: task.type[0].toString(),
          color: color[task.type[0]].color, // color picked by type
        }
      })
      set({ tasks: transformData })
    } catch (err) {
      console.log(err)
    }
  },
  addTask: async (task) => {
    try {
      const transformData = task.map((task) => {
        return {
          title: task.title,
          content: task.content,
          //now it not UTC can use dayjs.tz(task.start,'utc') to convert to utc
          //or need to convert on backend
          startAt: task.start,
          endAt: task.end,
          //
          completed: task.completed,
          type: [Number(task.type)],
        }
      })
      console.log(transformData, 'added')
      await taskServices.addTask(transformData)
      get().getTask()
    } catch (err) {
      console.log(err)
      //to show error
    }
  },
  updateTask: async (updateTask) => {
    try {
      const transformData = {
        id: Number(updateTask.id),
        title: updateTask.title,
        content: updateTask.content,
        startAt: updateTask.start,
        endAt: updateTask.end,
        completed: updateTask.completed,
        type: [Number(updateTask.type)],
      }

      await taskServices.updateTask(transformData)
      get().getTask()
    } catch (err) {
      console.log(err)
    }
  },
  deleteTask: async (id) => {
    try {
      await taskServices.deleteTask(id)
      get().getTask()
    } catch (err) {
      console.log(err)
    }
  },
  setEvent: (currentEvent) => {
    set({ event: currentEvent })
  },
}))
