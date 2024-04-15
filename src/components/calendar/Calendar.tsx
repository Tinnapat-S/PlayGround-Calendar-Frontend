import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import * as taskServices from '../../services/privateService'

import { useTaskStore } from '../../stores/useTasksStore'
import { useApplicationStore } from '../../stores/useStore'

export const Calendar = () => {
  const { tasks, setOpen, getTime } = useTaskStore()
  const { setLoading } = useApplicationStore()

  const handleClickDate = (selectInfo: DateClickArg) => {
    setOpen(true)
    getTime(selectInfo.date)
  }
  const handleEventClick = (args: any) => {
    console.log(args)
  }
  const handleDropEvent = async (args: any) => {
    const updateEvent = {
      id: +args.event._def.publicId,
      //no user id
      title: args.event._def.title,
      content: args.event._def.extendedProps.content,
      completed: args.event._def.extendedProps.completed,
      type: [+args.event._def.extendedProps.type],
      startAt: args.event._instance.range.start,
      endAt: args.event._instance.range.end,
    }
    setLoading(true)
    try {
      await taskServices.updateTask(updateEvent)
      // getTask()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
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
        contentHeight={600}
        eventDrop={handleDropEvent}
      />
    </>
  )
}
