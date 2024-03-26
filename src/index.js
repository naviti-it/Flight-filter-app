import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import filterReducer from './state'
import App from './App'
import { theme } from './theme'

const store = configureStore({
  reducer: { filter: filterReducer }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
)
