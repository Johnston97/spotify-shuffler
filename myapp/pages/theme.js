import { extendTheme } from '@chakra-ui/react'

const theme = {
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  colors: {
    brand: {
      bg: '#9747FF',
      bgDark: 'rgba(18,18,18,255)',
      text: '#fff',
      card: '#0A99FF',
      hover: 'rgba(30,30,30,255)',
      selected: 'rgba(35,35,35,255)',
      dashboardBg: 'rgba(42,50,56,255)',
      basicWhite: 'rgba(255,255,255,255)',
      subTitle: 'rgba(167,167,167,255)',
    },
  },
  sizes: {
    xl: {
      h: '56px',
      fontSize: 'lg',
      px: '32px',
      bg: '#9747FF',
    },
  },
}

export default extendTheme(theme)
