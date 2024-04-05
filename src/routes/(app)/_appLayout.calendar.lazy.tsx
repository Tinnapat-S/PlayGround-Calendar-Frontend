import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { Box, Container } from '@mui/material'
import { SelectBar } from '../../components/SelectBar'
import { useAuthStore } from '../../stores/useAuthStore'
import { Calendar } from '../../components/calendar/Calendar'

export const Route = createLazyFileRoute('/(app)/_appLayout/calendar')({
  component: CalendarPage,
})

function CalendarPage() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'whitesmoke',
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
        <SelectBar />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            sx={{
              outline: '1px solid red',
              flexGrow: 1,
              minWidth: 640,
            }}
          >
            {isAuthenticated ? (
              // <div id="calendar">calendar</div>
              <Calendar />
            ) : (
              //<Calendar />
              <Link to={'/login'}>signin</Link>
            )}
          </Box>
          <Box
            width={300}
            sx={{
              outline: '1px solid red',
              '@media (max-width: 1240px)': { width: 250 },
            }}
          >
            fd
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
