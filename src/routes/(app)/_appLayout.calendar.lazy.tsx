import { createLazyFileRoute } from '@tanstack/react-router'
import { Box, Container } from '@mui/material'
import { SelectBar } from '../../components/SelectBar'

export const Route = createLazyFileRoute('/(app)/_appLayout/calendar')({
  component: CalendarPage,
})

function CalendarPage() {
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
          ></Box>
          <Box
            width={300}
            sx={{
              outline: '1px solid red',
              '@media (max-width: 1240px)': { width: 250 },
            }}
          >
            fs
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
