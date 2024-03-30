import { Container, Typography } from '@mui/material'

export const NavBar = () => {
  return (
    <Container
      disableGutters
      sx={{
        height: '8vh',
        width: '100%',
        background: 'green',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%',
        }}
      >
        Calendar
      </Typography>
    </Container>
  )
}
