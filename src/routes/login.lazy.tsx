import { createLazyFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { LoginForm } from '../components/forms/loginForm/LoginForm'
import { useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useAuthStore } from '../stores/useAuthStore'
import { RedirectIfAuthenticate } from '../components/redirect/RedirectIfAuthenticate.tsx'

export const Route = createLazyFileRoute('/login')({
  component: Login,
})

// const fetchRefreshToken = async (): Promise<string> => {
//   try {
//     const response = await getAccessToken()
//     const newAccessToken: string = response.data.accessToken
//     if (!newAccessToken) {
//       throw new Error('New access token not found in response')
//     }
//     return 'newAccessToken'
//   } catch (error) {
//     throw error
//   }
// }

function Login() {
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<string>('')

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const onFail = (messages: any) => {
    setOpen(true)
    setMessages(messages)
  }
  const onSuccess = () => {
    setOpen(true)
    setMessages('')
  }

  return user ? (
    <RedirectIfAuthenticate />
  ) : (
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
          Sign in
        </Typography>
        <LoginForm onFail={onFail} onSuccess={onSuccess} />
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={messages ? 'error' : 'success'}
          variant="filled"
        >
          {messages ? messages : 'Register Success'}
        </Alert>
      </Snackbar>
    </Container>
  )
}
