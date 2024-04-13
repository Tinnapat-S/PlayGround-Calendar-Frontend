import { create } from 'zustand'
import { getAllTask } from '../services/privateService'
import dayjs from 'dayjs'
import { IRequestModalTask } from '../components/forms/Task/type'

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
  time: Date | null
}

type TaskActions = {
  setOpen: (isOpen: boolean) => void
  getTask: () => void
  addTask: (task: ITask[]) => void
  updateTask: (task: IRequestModalTask) => void
  deleteTask: (id: string) => void
  getTime: (time: Date) => void
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
      const tasks = await getAllTask()
      const transformData = tasks.map((task) => {
        return {
          id: task.id,
          start: dayjs(task.startAt).toDate(),
          end: dayjs(task.endAt).toDate(),
          title: task.title,
          content: task.content,
          completed: task.completed,
          type: task.type,
        }
      })
      console.log(transformData, '<<<')
      set({ tasks: transformData })
    } catch (err) {
      console.log(err)
    }
  },
  addTask: async (task) => {
    //send request => backend => type
    console.log(task)
    get().getTask()
  },
  updateTask: () => {},
  deleteTask: () => {},
  getTime: (time) => {
    set({ time })
  },
}))

// interface FormState {
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
