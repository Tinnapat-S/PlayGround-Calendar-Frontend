import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { Box, Container } from '@mui/material'
import { useAuthStore } from '../../stores/useAuthStore'
import { Calendar } from '../../components/calendar/Calendar'
import { useTaskStore } from '../../stores/useTasksStore'
import { useEffect } from 'react'
import { TaskModal } from '../../components/forms/Task/TaskModal'
import { SideBar } from '../../components/SideBar'
import theme from '../../theme'

export const Route = createLazyFileRoute('/(app)/_appLayout/calendar')({
  component: CalendarPage,
})

function CalendarPage() {
  const { isAuthenticated } = useAuthStore()
  const { getTask, isOpen } = useTaskStore()

  useEffect(() => {
    getTask()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.default,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 640,
            }}
          >
            {/* TASK MODAL */}
            {isOpen ? <TaskModal /> : null}
            {isAuthenticated ? <Calendar /> : <Link to={'/login'}>signin</Link>}
          </Box>
          <Box
            width={300}
            sx={{
              '@media (max-width: 1240px)': { display: 'none' },
            }}
          >
            {/* SIDEBAR */}
            {isAuthenticated ? <SideBar /> : null}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
