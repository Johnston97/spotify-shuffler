import { Flex } from '@chakra-ui/layout'
import Player from './Player'

const PlayBarContainer = ({
  accessToken,
  selectedTrack,
  spotifyApi,
  selectedPlaylist,
  chooseTrack,
  selectedPlaylistTracks,
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
        selectedPlaylistTracks={selectedPlaylistTracks}
      />
    </Flex>
  )
}

export default PlayBarContainer
