export interface IRequestModalTask {
  id?: number
  title: string
  content: string
  startAt: Date
  endAt: Date
  completed?: boolean
  type: number[]
}
export interface IResponseModalTask extends IRequestModalTask {
  readonly id: number
}

export interface ICalendarFormValue {
  id?: string
  startAt: Date
  endAt: Date
  title: string
  content: string
  completed?: boolean
  type: string
}
