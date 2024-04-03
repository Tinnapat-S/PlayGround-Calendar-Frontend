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
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import { useAuthStore } from '../../../stores/useAuthStore'
import { ILogin } from '../../../stores/useAuthStore'
import { useApplicationStore } from '../../../stores/useStore'

export const LoginForm: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: { email: '', password: '' },
    resolver: joiResolver(loginSchema),
  })
  const { login } = useAuthStore()
  const { loading } = useApplicationStore()
  // const mutation = useMutation({
  //   mutationFn: loginUser,
  //   onSuccess: () => {
  //     onSuccess()
  //     // Handle successful registration
  //   },
  //   onError: (error) => {
  //     if (error.message === 'Network Error') return onFail('TRY AGAIN LATER')
  //   },
  // })

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    login(data)
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
        {...register('email')}
        error={!!errors.email}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
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
      {loading ? (
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
