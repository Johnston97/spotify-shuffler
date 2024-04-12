import { Box } from '@chakra-ui/layout'
import useFriends from '../Helpers/useFriends'
import FriendActivity from './FriendActivity'
import scrollBar from '../../styles/scrollBar.json'

const FeedBar = () => {
  const friendActivity = useFriends()
  return friendActivity !== undefined && friendActivity.length > 0 ? (
    <Box
      // height="100vh"
      bg="brand.bgDark"
      width="300px"
      margin="10px"
      rounded="md"
      overflow="auto"
      css={scrollBar}
      overflowX="hidden"
    >
      {friendActivity.map((a) => {
        return <FriendActivity activity={a} key={a.user.name} />
      })}
    </Box>
  ) : (
    <Box
      // height="100vh"
      bg="brand.bgDark"
      width="300px"
      margin="10px"
      rounded="md"
      overflow="hidden"
    >
      <Box>EMpty</Box>
    </Box>
  )
}

export default FeedBar
