import { createTheme } from '@mui/material/styles'

export const shades = {
  primary: {
    100: '#cce7f4',
    200: '#99cfe9',
    300: '#66b7df',
    400: '#339fd4',
    500: '#0087c9',
    600: '#006ca1',
    700: '#005179',
    800: '#003650',
    900: '#001b28'
  },
  secondary: {
    100: '#ffefe1',
    200: '#fedfc2',
    300: '#fed0a4',
    400: '#fdc085',
    500: '#fdb067',
    600: '#ca8d52',
    700: '#986a3e',
    800: '#654629',
    900: '#332315'
  },
  neutral: {
    100: '#eaeaea',
    200: '#d5d5d5',
    300: '#bfbfbf',
    400: '#aaaaaa',
    500: '#959595',
    600: '#777777',
    700: '#595959',
    800: '#3c3c3c',
    900: '#1e1e1e'
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500]
    },
    secondary: {
      main: shades.secondary[500]
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100]
    }
  },
  typography: {
    fontFamily: ['Menlo', 'sans-serif'].join(','),
    fontSize: 12,
    h1: {
      fontFamily: ['Menlo', 'sans-serif'].join(','),
      fontSize: 48
    },
    h2: {
      fontFamily: ['Menlo', 'sans-serif'].join(','),
      fontSize: 36
    },
    h3: {
      fontFamily: ['Menlo', 'sans-serif'].join(','),
      fontSize: 20
    },
    h4: {
      fontFamily: ['Menlo', 'sans-serif'].join(','),
      fontSize: 14
    }
  }
})
