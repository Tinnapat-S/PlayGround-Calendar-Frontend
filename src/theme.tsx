import createTheme from '@mui/material/styles/createTheme'
import { red } from '@mui/material/colors'

const theme = createTheme({
  typography: {
    fontFamily: 'Russo One, sans-serif',
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'whitesmoke',
      paper: 'white',
    },
  },
})

export default theme
