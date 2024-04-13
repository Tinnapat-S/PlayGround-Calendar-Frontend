import * as React from 'react'
import { useTaskStore } from '../../../stores/useTasksStore'
import { Button, TextField } from '@mui/material'
import dayjs from 'dayjs'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useForm } from 'react-hook-form'
import { ICalendarFormValue } from './type'
import { styled } from '@mui/material/styles'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'
import { ToggleButton, Typography } from '@mui/material'
import { Event } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

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
  const { isOpen, setOpen, addTask, time } = useTaskStore()
  const { register, getValues, setValue, watch, handleSubmit } =
    useForm<ICalendarFormValue>({
      defaultValues: {
        title: '',
        content: '',
        startAt: dayjs(time).toDate(),
        endAt: dayjs(time).add(1, 'minute').toDate(),
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

  const onSubmit = (input: ICalendarFormValue) => {
    const transformData = [
      {
        start: dayjs(input.startAt).toDate(),
        end: dayjs(input.endAt).toDate(),
        title: input.title,
        content: input.content,
        completed: input.completed,
        type: input.type,
      },
    ]
    addTask(transformData)
    setOpen(false)
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 12,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Input your Task
            </Typography>

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
            />
            <TextField
              autoFocus
              required
              id="content"
              {...register('content')}
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <DateTimePicker
                label="Start Time"
                disablePast
                value={dayjs(dataInput.startAt)}
                onChange={(newValue) => {
                  setValue('startAt', dayjs(newValue).toDate())
                }}
              />
              <DateTimePicker
                label="End Time"
                minDateTime={dayjs(getValues().startAt)}
                value={dayjs(dataInput.endAt)}
                onChange={(newValue) =>
                  setValue('endAt', dayjs(newValue).toDate())
                }
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Subscribe</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
