export interface IRequestModalTask {
  id?: number
  title: string
  content: string
  startAt: string
  endAt: string
  completed?: boolean
  type: number[]
}
export interface IResponseModalTask extends IRequestModalTask {
  readonly id: number
}

export interface ICalendarFormValue {
  id: number | null
  startAt: Date
  endAt: Date
  title: string
  content: string
  completed?: boolean
  type: string
}
