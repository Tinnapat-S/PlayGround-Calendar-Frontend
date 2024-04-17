import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'
import { styled } from '@mui/material/styles'
import theme from '../theme'
import { Event } from '@mui/icons-material'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { PATH } from '../constants/path'

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

const SELECT_BAR_CONFIG = [
  {
    label: 'Calendar',
    href: PATH.CALENDAR,
    logo: <Event />,
  },
  { label: 'Passed Task', href: PATH.NEW_PAGE, logo: <Event /> },
]

export const SelectBar: React.FC = () => {
  const router = useRouterState()
  // const [value, setValue] = useState<string>('')
  const navigate = useNavigate()

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    navigate({ to: newValue })
  }

  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        paddingY: 1,
        paddingX: 2,
        borderRadius: 1,
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        value={router.location.pathname}
        exclusive
        sx={{ display: 'flex', gap: 1 }}
        onChange={handleChange}
      >
        {SELECT_BAR_CONFIG.map((item, index) => (
          <ToggleButton
            key={index}
            value={item.href}
            sx={{ display: 'flex', gap: 0.5 }}
          >
            {item.logo}
            <Typography>{item.label}</Typography>
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  )
}
