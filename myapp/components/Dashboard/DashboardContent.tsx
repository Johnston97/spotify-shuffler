import { Box, Flex, Text } from '@chakra-ui/layout'
import Playlist from '../Playlists/Playlist'
import { Image } from '@chakra-ui/react'
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
        bg="brand.bgDark"
        paddingY="0px"
        color="gray"
        height="100%"
        id="DashboardContent"
      ></Flex>
    )
  }
  return (
    <Flex
      id="DashboardContent"
      width="100%"
      paddingY="0px"
      color="brand.basicWhite"
      height="100%"
      flexDirection="column"
      bg="brand.bgDark"
      rounded="md"
    >
      <Flex id="PlaylistTitle">
        <Box paddingLeft={'25px'} paddingTop={'25px'}>
          <Image
            rounded="md"
            overflow="hidden"
            src={playlist.largeAlbumUrl}
            style={{ height: '175px', width: '175px' }}
          />
        </Box>
        <Flex paddingTop="75px" paddingLeft={'15px'} flexDirection={'column'}>
          <Box>
            <Text fontSize="5xl">{playlist.name}</Text>
          </Box>
          <Box>
            <Text fontSize="">{playlist.totalTracks + ' songs'}</Text>
          </Box>
          <Box>
            {/* <Text fontSize="">{playlist.totalTracks + ' s'}</Text> 
            Remove pagination as need to query all tracks to get total length*/}
          </Box>
        </Flex>
      </Flex>
      <Flex id="PlaylistContent">
        <Playlist
          spotifyApi={spotifyApi}
          playlist={playlist}
          chooseTrack={chooseTrack}
          selectedTrack={selectedTrack}
          choosePlaylistTracks={choosePlaylistTracks}
        ></Playlist>
      </Flex>
    </Flex>
  )
}

export default DashboardContent
