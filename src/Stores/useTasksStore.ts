import { create } from 'zustand'
import * as taskServices from '../services/privateService'
import dayjs from 'dayjs'

export interface ITask {
  id?: string
  start: Date
  end: Date
  title?: string
  content?: string
  completed?: boolean
  type?: string
}

interface TaskState {
  tasks: ITask[]
  isOpen: boolean
  time: { startTime: Date; endTime?: Date } | null
}

type TaskActions = {
  setOpen: (isOpen: boolean) => void
  getTask: () => void
  addTask: (task: ITask[]) => void
  updateTask: (updateTask: IUpdateTask) => void
  deleteTask: (id: string) => void
  getTime: (startTime: Date, endTime?: Date) => void
}

const initialState: TaskState = {
  tasks: [],
  isOpen: false,
  time: null,
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
          id: task.id,
          start: dayjs(task.startAt).startOf('minute').toDate(),
          end: dayjs(task.endAt).toDate(),
          title: task.title,
          content: task.content,
          completed: task.completed,
          type: task.type,
        }
      })
      console.log(transformData)
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
          type: task.type,
        }
      })
      await taskServices.addTask(transformData)
      get().getTask()
    } catch (err) {
      console.log(err)
      //to show error
    }
  },
  updateTask: () => {},
  deleteTask: () => {},
  getTime: (startTime, endTime) => {
    set({ time: { startTime, endTime } })
  },
}))

interface IUpdateTask {
  id: number
  //userId: string,
  title: string
  content: string
  type: number[]
  startAt: Date
  endAt: Date
} // interface FormState {
//   formData: IRequestModalTask
// }

// interface FormAction {
//   setFormData: (formData: IRequestModalTask) => void
//   resetForm: () => void
// }

// const initialTasksState: FormState = {
//   formData: {
//     title: '',
//     content: '',
//     startAt: dayjs(new Date()),
//     endAt: dayjs(new Date()),
//     completed: false,
//   },
// }

// export const useFormStore = create<FormState & FormAction>((set, get) => ({
//   ...initialTasksState,
//   setFormData: (formData: IRequestModalTask) => {
//     set({ formData })
//   },
//   resetForm: () => {
//     set({ ...initialTasksState })
//   },
// }))
