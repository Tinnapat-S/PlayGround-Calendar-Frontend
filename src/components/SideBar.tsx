import { useTaskStore } from '../stores/useTasksStore'
import { Box, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from '../theme'
import { ITask } from '../stores/useTasksStore'
import dayjs, { Dayjs } from 'dayjs'

const SideBarStyledCard = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  borderRadius: 6,
}))

interface ISidebarCardProps {
  taskData: ITask
}
export const SideBarCard: React.FC<ISidebarCardProps> = ({ taskData }) => {
  const formatTime = (time: Dayjs, time2: Dayjs): string => {
    if (time.isSame(time2, 'month') && !time.isSame(time2, 'day')) {
      return `${dayjs(time).format('MMMM D')}-${dayjs(time2).format('D, YYYY')}`
    } else if (!time.isSame(time2, 'month')) {
      if (time.isSame(time2, 'year')) {
        return `${dayjs(time).format('MMMM D')}-${dayjs(time2).format('MMM DD YYYY')}`
      }
      return `${dayjs(time).format('MMMM D YYYY')}-${dayjs(time2).format('MMMM D YYYY')}`
    }
    return `${dayjs(time).format('MMMM D, YYYY')}`
  }
  const renderDayFormat = formatTime(dayjs(taskData.start), dayjs(taskData.end))
  return (
    <SideBarStyledCard sx={{ background: taskData.backgroundColorSidebar }}>
      <Box
        sx={{
          width: '10px',
          background: taskData.color,
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
      const taskEnd = dayjs(task.end)
      return (
        (taskStart.isSame(currentTime, 'day') ||
          taskStart.isBefore(currentTime)) &&
        taskEnd.isAfter(currentTime)
      )
    })
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))
  const tomorrowData = tasks
    .filter((task) => {
      const taskStart = dayjs(task.start)
      const taskEnd = dayjs(task.end)
      return (
        dayjs(task.start).isSame(tomorrow, 'day') ||
        (taskStart.isBefore(tomorrow) && taskEnd.isAfter(tomorrow))
      )
    })
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
          {todayData.map((task) => (
            <SideBarCard key={task.id} taskData={task} />
          ))}
        </>
      )}
      {tomorrowData.length > 0 && (
        <>
          <Typography variant="h6">Tomorrow</Typography>
          {tomorrowData.map((task) => (
            <SideBarCard key={task.id} taskData={task} />
          ))}
        </>
      )}
      {otherDayData.length > 0 && (
        <>
          <Typography variant="h6">Other days</Typography>
          {otherDayData.map((task) => (
            <SideBarCard key={task.id} taskData={task} />
          ))}
        </>
      )}
    </SideBarStyledContainer>
  )
}
