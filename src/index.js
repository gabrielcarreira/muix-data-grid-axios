import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00c056',
      darker: '#053e85',
      contrastText: '#fff'
    },
    secondary: {
      main: '#333',
      darker: '#222',
      contrastText: '#fff'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 1000,
      lg: 1200,
      xl: 1600
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
