import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

import { useTaskStore } from '../../stores/useTasksStore'

export const Calendar = () => {
  const { tasks, setOpen, getTime } = useTaskStore()

  const handleClickDate = (selectInfo: DateClickArg) => {
    setOpen(true)
    getTime(selectInfo.date)
    console.log(selectInfo)
  }
  const handleEventClick = (args: any) => {
    console.log(args)
  }

  return (
    <>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        events={tasks}
        dateClick={handleClickDate}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        dayMaxEventRows={true}
        views={{
          dayGrid: {
            dayMaxEventRows: 3,
          },
        }}
      />
    </>
  )
}
