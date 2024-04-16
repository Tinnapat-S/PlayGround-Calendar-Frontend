import { useTaskStore } from '../stores/useTasksStore'
import { Box, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from '../theme'
import { ITask } from '../stores/useTasksStore'
import dayjs, { Dayjs } from 'dayjs'
import { color } from '../constants/colorSidebar'

const SideBarStyledCard = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  borderRadius: 6,
}))

interface ISidebarCardProps {
  taskData: ITask
  index: number
}
export const SideBarCard: React.FC<ISidebarCardProps> = ({
  taskData,
  index,
}) => {
  const formatTime = (time: Dayjs, time2: Dayjs) => {
    if (time.isSame(time2, 'month')) {
      return `${dayjs(time).format('MMMM D')}-${dayjs(time2).format('D, YYYY')}`
    } else if (time.isSame(time2, 'year')) {
      return `${dayjs(time).format('MMMM D')}-${dayjs(time2).format('MMM DD YYYY')}`
    }
    return `${dayjs(time).format('MMMM D YYYY')}-${dayjs(time2).format('MMMM D YYYY')}`
  }
  const calculateTimeLater = (minuteInput: number) => {
    const currentTime = dayjs()
    return currentTime.add(minuteInput, 'minute')
  }
  const getColorIndex = (): number => {
    const beforeThirtyMinutes = calculateTimeLater(30)
    if (
      dayjs(taskData.end).isBefore(beforeThirtyMinutes) &&
      dayjs(taskData.start).isBefore(beforeThirtyMinutes)
    ) {
      return 3
    }
    return index
  }
  const colorIndex = getColorIndex()
  const renderDayFormat = formatTime(dayjs(taskData.start), dayjs(taskData.end))

  return (
    <SideBarStyledCard sx={{ background: color[colorIndex].backgroundColor }}>
      <Box
        sx={{
          width: '10px',
          background: color[colorIndex].headerColor,
          borderRadius: '6px 0 0 6px',
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 1,
        }}
      >
        <Typography
          sx={{ display: 'flex', justifyContent: 'flex-end', color: '#636571' }}
        >
          {renderDayFormat}
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>{taskData.title}</Typography>
        <Typography>{taskData.content}</Typography>
        <Typography
          sx={{ color: '#636571' }}
        >{`${dayjs(taskData.start).format('LT')} - ${dayjs(taskData.end).format('LT')}`}</Typography>
      </Box>
    </SideBarStyledCard>
  )
}

const SideBarStyledContainer = styled(Box)(() => ({
  width: '100%',
  background: theme.palette.background.paper,
  borderRadius: 12,
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  height: '82vh',
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '&-ms-overflow-style:': {
    display: 'none', // Hide the scrollbar for IE
  },
}))

export const SideBar = () => {
  const { tasks } = useTaskStore()
  const currentTime = dayjs()
  const tomorrow = dayjs().add(1, 'day').startOf('day').toDate()

  const todayData = tasks
    .filter((task) => {
      const taskStart = dayjs(task.start)
      return taskStart.isAfter(currentTime) && taskStart.isBefore(tomorrow)
    })
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))
  const tomorrowData = tasks
    .filter(
      (task) =>
        dayjs(task.start).isSame(tomorrow, 'day') ||
        (task.start < tomorrow && task.end > tomorrow)
    )
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))
  const otherDayData = tasks
    .filter((task) => dayjs(task.start).isAfter(tomorrow, 'day'))
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))

  return (
    <SideBarStyledContainer>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        UpComing
      </Typography>
      <Divider />
      {todayData.length > 0 && (
        <>
          <Typography variant="h6">Today</Typography>
          {todayData.map((task, index) => (
            <SideBarCard key={task.id} taskData={task} index={index} />
          ))}
        </>
      )}
      {tomorrowData.length > 0 && (
        <>
          <Typography variant="h6">Tomorrow</Typography>
          {tomorrowData.map((task, index) => (
            <SideBarCard key={task.id} taskData={task} index={index} />
          ))}
        </>
      )}
      {otherDayData.length > 0 && (
        <>
          <Typography variant="h6">Other days</Typography>
          {otherDayData.map((task, index) => (
            <SideBarCard key={task.id} taskData={task} index={index} />
          ))}
        </>
      )}
    </SideBarStyledContainer>
  )
}
