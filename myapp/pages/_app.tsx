import { ChakraProvider } from '@chakra-ui/react'
import App from '../components/App'
import 'reset-css'
import theme from './theme'

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
