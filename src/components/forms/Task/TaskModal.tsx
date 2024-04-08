import * as React from 'react'
import { useTaskStore } from '../../../stores/useTasksStore'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useForm } from 'react-hook-form'
import { IRequestModalTask } from './type'
import { styled } from '@mui/material/styles'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'
import { ToggleButton, Typography } from '@mui/material'
import { Event } from '@mui/icons-material'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: '1px solid #636571',
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 1,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {},
}))

export const TaskModal = () => {
  const { isOpen, setOpen, addTask } = useTaskStore()
  const { register, getValues, setValue, watch } = useForm<IRequestModalTask>({
    defaultValues: {
      title: '',
      content: '',
      startAt: dayjs(new Date()),
      endAt: dayjs(new Date()).add(1, 'minute'),
      completed: false,
      type: '1',
    },
  })
  watch('type')
  const dataInput = getValues()
  const handleChangeRadio = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setValue('type', newValue)
  }
  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          addTask(getValues())

          setOpen(false)
        },
      }}
    >
      <DialogTitle>Your Tasks</DialogTitle>
      <DialogContent>
        <StyledToggleButtonGroup
          size="small"
          value={dataInput.type}
          exclusive
          sx={{ display: 'flex', gap: 1 }}
          onChange={handleChangeRadio}
        >
          <ToggleButton value="1" sx={{ display: 'flex', gap: 0.5 }}>
            <Event />
            <Typography>1</Typography>
          </ToggleButton>
          <ToggleButton value="2">
            {' '}
            <Event />
            <Typography>2</Typography>
          </ToggleButton>
          <ToggleButton value="3">
            {' '}
            <Event />
            <Typography>3</Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
        <TextField
          autoFocus
          required
          id="tile"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          {...register('title')}
          name="title"
        />
        <TextField
          autoFocus
          required
          id="content"
          {...register('content')}
          name="content"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Time"
            name="startAt"
            value={dataInput.startAt}
            onChange={(newValue: any) => setValue('startAt', newValue)}
          />
          <DateTimePicker
            label="End Time"
            name="endAt"
            disablePast
            value={dataInput.endAt}
            onChange={(newValue: any) => setValue('endAt', newValue)}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false)
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}
