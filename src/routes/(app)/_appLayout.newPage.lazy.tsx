import { createLazyFileRoute } from '@tanstack/react-router'
import { Container } from '@mui/material'

export const Route = createLazyFileRoute('/(app)/_appLayout/newPage')({
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
      new Page
    </Container>
  )
}
