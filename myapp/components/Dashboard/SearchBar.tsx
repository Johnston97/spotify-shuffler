import { Box, Flex } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/react'

const SearchBar = () => {
  return (
    <Flex width="100%" bg="brand.bgDark" paddingY="0px" color="gray">
      <Box id="NavigationButtons"></Box>
      <Box id="SearchBar" width="100%">
        {/* <Textarea placeholder="What do you want to listen to?" /> */}
      </Box>
      <Box id="Profile"></Box>
    </Flex>
  )
}

export default SearchBar
