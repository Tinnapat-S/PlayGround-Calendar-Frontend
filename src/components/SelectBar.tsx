import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
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
export const SelectBar = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setValue(newValue)
  }
  return (
    <Box
      sx={{
        background: 'white',
        paddingY: 0.5,
        paddingX: 1,
        borderRadius: 1,
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        value={value}
        exclusive
        sx={{ display: 'flex', gap: 1 }}
        onChange={handleChange}
      >
        <ToggleButton value="calendar" sx={{ display: 'flex', gap: 0.5 }}>
          <Event />
          <Typography>Calendar</Typography>
        </ToggleButton>
        <ToggleButton value="box1">
          {' '}
          <Event />
          <Typography>Box</Typography>
        </ToggleButton>
        <ToggleButton value="box2">
          {' '}
          <Event />
          <Typography>Box</Typography>
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  )
}
