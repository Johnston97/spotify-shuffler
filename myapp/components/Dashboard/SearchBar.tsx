import { Box, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

const SearchBar = ({ myProfile }) => {
  return (
    <Flex width="100%" bg="brand.bgDark" paddingY="0px" color="gray">
      <Box id="NavigationButtons"></Box>
      <Box id="SearchBar" width="100%">
        {/* <Textarea placeholder="What do you want to listen to?" /> */}
      </Box>
      <Box id="myProfile" marginRight="10px" marginTop="5px">
        {' '}
        <Image
          rounded="md"
          borderRadius="full"
          aspectRatio="1/1"
          objectFit="cover"
          src={myProfile.images[0].url}
          boxSize="48px"
        />
      </Box>
    </Flex>
  )
}

export default SearchBar
