import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { EventDropArg, EventClickArg } from '@fullcalendar/core'
import * as taskServices from '../../services/privateService'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Box } from '@mui/material'

import { useTaskStore } from '../../stores/useTasksStore'
import { useApplicationStore } from '../../stores/useStore'
import theme from '../../theme'
dayjs.extend(utc)

export const Calendar = () => {
  const { tasks, setOpen, setEvent } = useTaskStore()
  const { setLoading } = useApplicationStore()

  const eventTaskObject = tasks.map((item) => {
    return {
      ...item,
      id: item.id.toString(),
      title: item.title,
      content: item.content,
      type: item.type,
      start: item.start.format(),
      end: item.end.format(),
      completed: item.completed,
    }
  })

  const handleClickDate = (selectInfo: DateClickArg) => {
    console.log(selectInfo.date, '<<<<< Date')
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
      id: null,
      start: targetDate,
      end: targetDate,
      title: '',
      content: '',
      type: '1',
    }
    setEvent(preEvent)
  }

  const handleEventClick = (args: EventClickArg) => {
    const targetTaskData = tasks.find((task) => {
      return task.id === Number.parseInt(args.event._def.publicId)
    })
    setOpen(true)
    if (targetTaskData) {
      console.log(targetTaskData)
      setEvent(targetTaskData)
    }
  }

  const setDropEvent = async (args: EventDropArg) => {
    const targetTaskData = tasks.find(
      (task) => task.id === Number(args.event._def.publicId)
    )

    setLoading(true)
    try {
      if (!targetTaskData) throw new Error('targetTaskData is undefined')
      await taskServices.updateTask({
        id: targetTaskData.id,
        title: targetTaskData.title,
        content: targetTaskData.content,
        type: [Number(targetTaskData.type)],
        startAt: targetTaskData.start.toDate(),
        endAt: targetTaskData.end.toDate(),
      })
      // getTask()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDropEvent = (args: EventDropArg) => {
    if (
      dayjs(args.oldEvent._instance?.range?.end).isAfter(dayjs(), 'hour') &&
      dayjs(args.event._instance?.range?.start).isBefore(dayjs(), 'minute')
    ) {
      args.revert()
    } else {
      setDropEvent(args)
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
        timeZone="local"
        plugins={[interactionPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventTaskObject}
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
