import { create } from 'zustand'
import * as taskServices from '../services/privateService'
import dayjs, { Dayjs } from 'dayjs'
import { color } from '../constants/colorSidebar'

export interface ITask {
  //form render
  id: number
  start: Dayjs
  end: Dayjs
  title: string
  content: string
  completed?: boolean
  type?: string
  color?: string
  backgroundColorSidebar?: string
  colorName?: string
}
interface ICreateTask extends Omit<ITask, 'id'> {}
interface IEvent {
  id: number | null
  start: Dayjs
  end: Dayjs
  title: string
  content: string
  completed?: boolean
  type?: string
  color?: string
  backgroundColorSidebar?: string
  colorName?: string
}

interface IUpdateTask {
  id: number | null
  start: Dayjs
  end: Dayjs
  title: string
  content: string
  completed?: boolean
  type?: string
}
interface TaskState {
  tasks: ITask[]
  isOpen: boolean
  event: IEvent | null
}

type TaskActions = {
  setOpen: (isOpen: boolean) => void
  getTask: () => void
  addTask: (task: ICreateTask[]) => void
  updateTask: (updateTask: IUpdateTask) => void
  deleteTask: (id: number) => void
  setEvent: (currentEvent: IEvent) => void
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
      const calculateTimeEarlier = (minuteInput: number): Dayjs => {
        const currentTime = dayjs()
        return currentTime.add(minuteInput, 'minute')
      }
      const getColor = (taskData: any) => {
        const beforeThirtyMinutes = calculateTimeEarlier(30)
        if (
          dayjs(taskData.startAt).startOf('minute') < beforeThirtyMinutes &&
          dayjs().isSame(
            dayjs(taskData.startAt).startOf('minute').toDate(),
            'day'
          )
        ) {
          return color[0]
        }
        return color[taskData.type[0]]
      }

      const tasks = await taskServices.getAllTask()

      const transformData = tasks.map((task) => {
        return {
          id: task.id,
          start: dayjs(task.startAt).utc(),
          end: dayjs(task.endAt).utc(),
          title: task.title,
          content: task.content,
          completed: task.completed,
          type: task.type[0].toString(),
          ...getColor(task),
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
          startAt: dayjs(task.start).utc().format(), // here
          endAt: dayjs(task.end).utc().format(),
          type: [Number(task.type)],
        }
      })
      console.log(transformData, '<<< transformData')
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
        startAt: updateTask.start.toDate(),
        endAt: updateTask.end.toDate(),
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
