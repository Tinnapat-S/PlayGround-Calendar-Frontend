import { Container, Box, Typography } from '@mui/material'

export const SideBar = () => {
  return (
    <Container
      sx={{
        height: '100vh',
        background: 'red',
        width: '300px',
        '@media (max-width: 1024px)': {
          display: 'none',
        },
      }}
      disableGutters
    >
      <Box sx={{ height: '8vh', width: '100%', background: 'white' }}>
        <Typography variant="h4">hello world</Typography>
      </Box>
    </Container>
  )
}
