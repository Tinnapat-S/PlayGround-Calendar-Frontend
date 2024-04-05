import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { createEventId, INITIAL_EVENTS } from './event.util'
export const Calendar = () => {
  const handleClickDate = (selectInfo: DateClickArg) => {
    const title = prompt('Please enter a new title for your event')
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        allDay: true,
      })
    }
  }

  const handleEventClick = (args: any) => {
    console.log(args)
  }

  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      initialEvents={INITIAL_EVENTS}
      events={[
        { title: 'event 1', date: '2024-04-04' },
        { title: 'event 2', date: '2024-04-04' },
        { title: 'event 2', date: '2024-04-05' },
        { title: 'event 2', date: '2024-04-06' },
      ]}
      dateClick={handleClickDate}
      eventClick={handleEventClick}
      editable={true}
      selectable={true}
      //eventContent={renderEvent}
    />
  )
}
