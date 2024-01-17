import { Flex } from '@chakra-ui/layout'
import SearchBar from './SearchBar'

const NavigatorContainer = () => {
  return (
    <Flex
      width="100%"
      height="calc(10vh)"
      bg="blue"
      paddingX="5px"
      padding="5px"
      color="gray"
      id="NavigatorWrapper"
    >
      <SearchBar />
    </Flex>
  )
}

export default NavigatorContainer
