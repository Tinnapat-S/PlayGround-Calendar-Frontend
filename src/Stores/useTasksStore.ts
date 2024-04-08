import { create } from 'zustand'
import { getAllTask } from '../services/privateService'
import { Dayjs } from 'dayjs'

type Task = {
  title?: string
  content?: string
  startDate?: string
  startAt: Dayjs
  endDate?: string
  endAt: Dayjs
  completed?: boolean
  type?: string
}

interface TaskState {
  tasks: Task[]
  isOpen: boolean
}

type TaskActions = {
  setOpen: (isOpen: boolean) => void
  getTask: () => void
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
}

const initialState: TaskState = {
  tasks: [],
  isOpen: false,
}

export const useTaskStore = create<TaskState & TaskActions>((set) => ({
  ...initialState,
  setOpen: (status: boolean) => {
    set({ isOpen: status })
  },
  getTask: async () => {
    const tasks = await getAllTask()
    set({ tasks })
  },
  addTask: (task) => {
    console.log(task, 'this is task')
  },
  updateTask: () => {},
  deleteTask: () => {},
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
