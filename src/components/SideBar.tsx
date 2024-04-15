import { useTaskStore } from '../stores/useTasksStore'
import { Box, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ITask } from '../stores/useTasksStore'
import dayjs from 'dayjs'

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
  const color = [
    { backgroundColor: 'rgba(135, 206, 235, 0.5)', headerColor: 'skyblue' },
    { backgroundColor: 'rgba(255, 255, 0, 0.3)', headerColor: 'yellow' },
    { backgroundColor: 'rgba(255, 0, 0, 0.3)', headerColor: 'red' },
  ]

  return (
    <SideBarStyledCard sx={{ background: color[index].backgroundColor }}>
      <Box
        sx={{
          width: '10px',
          background: color[index].headerColor,
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
          {dayjs(taskData.start).format('LL')}
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
  background: 'white',
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
  const today = dayjs().toDate()
  const tomorrow = dayjs().add(1, 'day').toDate()
  const todayData = tasks
    .filter((task) => dayjs(task.start).isSame(today, 'day'))
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))
  const tomorrowData = tasks
    .filter((task) => dayjs(task.start).isSame(tomorrow, 'day'))
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))
  const otherDayData = tasks
    .filter(
      (task) =>
        !dayjs(task.start).isSame(today, 'day') &&
        !dayjs(task.start).isSame(tomorrow, 'day')
    )
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
          <Typography variant="h6">Else</Typography>
          {otherDayData.map((task, index) => (
            <SideBarCard key={task.id} taskData={task} index={index} />
          ))}
        </>
      )}
    </SideBarStyledContainer>
  )
}
