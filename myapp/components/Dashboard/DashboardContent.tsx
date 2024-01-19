import { Box, Flex } from '@chakra-ui/layout'
import Playlist from '../Playlists/Playlist'

const DashboardContent = ({
  spotifyApi,
  playlist,
  chooseTrack,
  selectedTrack,
  choosePlaylistTracks,
}) => {
  if (!playlist) {
    return (
      <Flex
        width="100%"
        bg="dashboardBg"
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
      paddingY="0px"
      color="black"
      height="100%"
      flexDirection="row"
      bg="dashboardBg"
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
      <Flex id="PlaylistContent" bg="brand.dashboardBg">
        <Playlist
          spotifyApi={spotifyApi}
          playlist={playlist}
          chooseTrack={chooseTrack}
          selectedTrack={selectedTrack}
          choosePlaylistTracks={choosePlaylistTracks}
        ></Playlist>
      </Flex>
    </Box>
  )
}

export default DashboardContent
