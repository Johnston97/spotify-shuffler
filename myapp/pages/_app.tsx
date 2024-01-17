import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from '../components/App'
import 'reset-css'

const theme = extendTheme({})

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <App>
        <Component {...pageProps} />
      </App>
    </ChakraProvider>
  )
}

export default MyApp
