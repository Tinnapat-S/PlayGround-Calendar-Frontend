import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import * as taskServices from '../../services/privateService'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { useTaskStore } from '../../stores/useTasksStore'
import { useApplicationStore } from '../../stores/useStore'
import theme from '../../theme'
dayjs.extend(utc)
export const Calendar = () => {
  const { tasks, setOpen, getTime } = useTaskStore()
  const { setLoading } = useApplicationStore()

  const handleClickDate = (selectInfo: DateClickArg) => {
    setOpen(true)
    const localDate = selectInfo.date
    getTime(localDate, localDate)
  }
  const handleEventClick = (args: any) => {
    setOpen(true)
    //get event
    console.log(args.event._def.publicId)
    getTime(args.event._instance.range.start, args.event._instance.range.end)
  }
  const handleDropEvent = async (args: any) => {
    const updateEvent = {
      id: Number(args.event._def.publicId),
      //no user id
      title: args.event._def.title,
      content: args.event._def.extendedProps.content,
      completed: args.event._def.extendedProps.completed,
      type: [Number(args.event._def.extendedProps.type)],
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
    <Box
      sx={{
        background: theme.palette.background.paper,
        padding: 1.5,
        borderRadius: 3,
      }}
    >
      <FullCalendar
        // timeZone="UTC"
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
    </Box>
  )
}
