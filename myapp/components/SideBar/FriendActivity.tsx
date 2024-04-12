import { Box, Flex } from '@chakra-ui/layout'
import { Image, Text } from '@chakra-ui/react'
import { getDateAddedFormattedShort } from '../Helpers/dates'
import { LastListen } from './LastListen'

const FriendActivity = ({ activity }) => {
  const lastListenedTo = getDateAddedFormattedShort(
    new Date(),
    activity.timestamp
  )
  return (
    <Flex
      id="friendActivity"
      height="64px"
      bg="brand.bgDark"
      margin="10px"
      color={'white'}
      width="calc(100% - 10px)"
      rounded="md"
      overflow="hidden"
    >
      <Box width="25%" marginLeft="5px">
        <Image
          rounded="md"
          borderRadius="full"
          aspectRatio="1/1"
          objectFit="cover"
          src={
            activity.user.imageUrl
              ? activity.user.imageUrl
              : '/assets/emptyProfile.png'
          }
          boxSize="48px"
        />
      </Box>
      <Flex flexDirection="column" width="75%" marginLeft="0px">
        <Flex flexDirection="row" height="20%">
          <Box marginRight="10px">
            <Text fontSize="xs">{activity.user.name}</Text>
          </Box>
          <Box marginLeft="auto!" marginRight="10px">
            <LastListen lastListenedTo={lastListenedTo} />
          </Box>
        </Flex>
        <Box marginTop="5px" width="85%">
          <Box margin="auto" textAlign={'left'}>
            <Text fontSize="xs" isTruncated>
              {activity.track.album.name + ' - ' + activity.track.artist.name}
            </Text>
          </Box>
          <Box margin="auto" textAlign={'left'}>
            <Text fontSize="xs" isTruncated>
              {activity.track.context.name}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default FriendActivity
