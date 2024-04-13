export interface IRequestModalTask {
  title?: string
  content?: string
  startAt: Date
  endAt: Date
  completed?: boolean
  type?: string
}

export interface IResponseModalTask extends IRequestModalTask {
  readonly id: string
}

export interface ICalendarFormValue {
  startAt: Date | null
  endAt: Date | null
  title: string
  content: string
  completed: boolean
  type: string
}
