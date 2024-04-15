export interface IRequestModalTask {
  title?: string
  content?: string
  startAt: Date
  endAt: Date
  completed?: boolean
  type?: string
}
//ITask
// id?: string
// start: Date
// end: Date
// title?: string
// content?: string
// completed?: boolean
// type?: string

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
