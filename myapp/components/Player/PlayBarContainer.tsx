import { Flex } from '@chakra-ui/layout'
import Player from './Player'

const PlayBarContainer = ({
  accessToken,
  selectedTrack,
  spotifyApi,
  selectedPlaylist,
  chooseTrack,
}) => {
  return (
    <Flex
      id="PlayBarContainer"
      bg="green"
      color="gray"
      width="100%"
      height="100%"
      flex-direction="row"
    >
      <Player
        accessToken={accessToken}
        selectedTrack={selectedTrack}
        spotifyApi={spotifyApi}
        selectedPlaylist={selectedPlaylist}
        chooseTrack={chooseTrack}
      />
    </Flex>
  )
}

export default PlayBarContainer
