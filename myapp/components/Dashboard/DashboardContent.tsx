import { Box, Flex } from '@chakra-ui/layout'
import Playlist from '../Playlists/Playlist'

const DashboardContent = ({
  spotifyApi,
  playlist,
  chooseTrack,
  selectedTrack,
}) => {
  if (!playlist) {
    return (
      <Flex
        width="100%"
        bg="darkblue"
        paddingY="0px"
        color="gray"
        height="100%"
        id="DashboardContent"
      >
        Main dashboard content
      </Flex>
    )
  }
  return (
    <Box
      id="DashboardContent"
      width="100%"
      bg="antiquewhite"
      paddingY="0px"
      color="black"
      height="100%"
      flexDirection="row"
    >
      <Box id="PlaylistTitle" bg="cyan.700">
        <Box>
          <img
            src={playlist.albumUrl}
            style={{ height: '128px', width: '128px' }}
          />
        </Box>
        {playlist.name}
      </Box>
      <Flex id="PlaylistContent" bg="darkgreen">
        <Playlist
          spotifyApi={spotifyApi}
          playlist={playlist}
          chooseTrack={chooseTrack}
          selectedTrack={selectedTrack}
        ></Playlist>
      </Flex>
    </Box>
  )
}

export default DashboardContent
