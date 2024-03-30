import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { loginSchema } from './loginSchema'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../../services/publicService'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
interface ILogin {
  username: string
  password: string
}

interface Props {
  onFail: (messages: string) => void
  onSuccess: () => void
}

export const LoginForm: React.FC<Props> = ({ onFail, onSuccess }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: { username: '', password: '' },
    resolver: joiResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      onSuccess()
      // Handle successful registration
    },
    onError: (error) => {
      if (error.message === 'Network Error') return onFail('TRY AGAIN LATER')
    },
  })

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    mutation.mutate(data)
    reset()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        {...register('username')}
        error={!!errors.username}
        margin="normal"
        required
        fullWidth
        id="username"
        label="Email Address"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        {...register('password')}
        error={!!errors.password}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      {mutation.isPending ? (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          Save
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      )}
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}
