import { Dayjs } from 'dayjs'
export interface IRequestModalTask {
  title?: string
  content?: string
  startDate?: string
  startAt: Dayjs
  endDate?: string
  endAt: Dayjs
  completed?: boolean
  type?: string
}

export interface IResponseModalTask extends IRequestModalTask {
  readonly id?: string
}
