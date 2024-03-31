import { useForm, SubmitHandler } from 'react-hook-form'
import { schema } from './schema'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { joiResolver } from '@hookform/resolvers/joi'
import { IFormInput } from './type'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import { useAuthStore } from '../../../stores/useAuthStore'
import { useApplicationStore } from '../../../stores/useStore'

export const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuthStore()
  const { loading } = useApplicationStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    resolver: joiResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    registerUser(data.email, data.password)
    reset()
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('firstName')}
            error={errors.firstName ? true : false}
            helperText={errors.firstName?.message || null}
            autoComplete="given-name"
            name="firstName"
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('lastName')}
            error={errors.lastName ? true : false}
            helperText={errors.lastName?.message || null}
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('email')}
            error={errors.email ? true : false}
            helperText={errors.email?.message || null}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('password')}
            error={errors.password ? true : false}
            helperText={errors.password?.message || null}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('confirmPassword')}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword?.message || null}
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
          />
        </Grid>
      </Grid>
      {loading ? (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          fullWidth
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
          Sign Up
        </Button>
      )}

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="#" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}
