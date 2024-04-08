import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

import { useTaskStore } from '../../stores/useTasksStore'

export const Calendar = () => {
  const { tasks, setOpen } = useTaskStore()

  const handleClickDate = (selectInfo: DateClickArg) => {
    setOpen(true)
    console.log(selectInfo)
    // const title = prompt('Please enter a new title for your event')
    // const calendarApi = selectInfo.view.calendar
    // console.log(selectInfo.view.calendar, 'this is select info')
    // calendarApi.unselect() // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     allDay: true,
    //   })
    // }
  }

  const handleEventClick = (args: any) => {
    console.log(args)
  }

  return (
    <>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        initialEvents={[]}
        events={tasks}
        dateClick={handleClickDate}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        //eventContent={renderEvent}
      />
    </>
  )
}
