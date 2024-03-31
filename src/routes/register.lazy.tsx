import { createLazyFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { RegisterForm } from '../components/forms/registerForm/RegisterForm'
import { Snackbar, Alert } from '@mui/material'
import { RedirectIfAuthenticate } from '../components/redirect/RedirectIfAuthenticate.tsx'

export const Route = createLazyFileRoute('/register')({
  component: Register,
})

// function Register() {
//   return <div className="p-2">Hello from About!</div>
// }

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function Register() {
  const [open, setOpen] = React.useState(false)

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <>
      <RedirectIfAuthenticate />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <RegisterForm />
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" variant="filled">
            Register Success
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}
