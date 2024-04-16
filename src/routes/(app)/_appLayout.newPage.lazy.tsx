import { createLazyFileRoute } from '@tanstack/react-router'
import { Container } from '@mui/material'
import theme from '../../theme'

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
        background: theme.palette.background.default,
        padding: 2,
      }}
    >
      new Page
    </Container>
  )
}
