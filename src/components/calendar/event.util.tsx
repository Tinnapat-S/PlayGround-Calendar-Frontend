import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
const today = new Date()
const todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
const tomorrow = new Date(todayStr).setDate(today.getDate() + 1)
const nextDay = new Date(tomorrow).toISOString().replace(/T.*$/, '')

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T00:00:00',
    // end: nextDay + 'T12:00:00',
  },
  {
    id: createEventId(),
    title: 'Test work',
    start: todayStr + 'T14:00:00',
    end: nextDay + 'T12:00:00',
    color: 'red',
    textColor: 'white',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T14:00:00',
    end: nextDay + 'T11:00:00',
  },
]

export function createEventId() {
  return String(eventGuid++)
}
