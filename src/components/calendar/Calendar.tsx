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
  const { tasks, setOpen, setEvent } = useTaskStore()
  const { setLoading } = useApplicationStore()

  const handleClickDate = (selectInfo: DateClickArg) => {
    const now = dayjs()
    const targetDate = dayjs(selectInfo.date).isSame(now, 'day')
      ? now.add(1, 'second')
      : dayjs(selectInfo.date)

    if (targetDate.isAfter(now)) {
      setOpen(true)
    } else {
      console.log('do something')
    }

    const preEvent = {
      id: undefined,
      start: targetDate.toDate(),
      end: targetDate.toDate(),
      title: '',
      content: '',
      type: '1',
    }
    setEvent(preEvent)
  }
  const handleEventClick = (args: any) => {
    setOpen(true)
    const preEvent = {
      id: args.event._def.publicId,
      start: args.event._instance.range.start,
      end: args.event._instance.range.end,
      title: args.event._def.title,
      content: args.event._def.extendedProps.content,
      type: args.event._def.extendedProps.type,
    }
    setEvent(preEvent)
  }
  const handleDropEvent = async (args: any) => {
    console.log(confirm('Are you sure? it cant be back'))
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
        timeZone="UTC"
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
        eventDidMount={(event) => {
          if (!event.isPast) return
          if (
            event.isPast &&
            dayjs(event.event._instance?.range?.end).isBefore(dayjs())
          ) {
            console.log(event)
            event.el.style.opacity = '0.5'
            event.el.style.pointerEvents = 'none'
          }
        }}
        selectAllow={(allDay) => {
          const dayjsFormat = dayjs(allDay.start)
          if (dayjsFormat.isAfter(dayjs().subtract(1, 'day'))) return true
          return false
        }}
      />
    </Box>
  )
}
