import { Box, Flex, Text } from '@chakra-ui/layout'
import Playlist from '../Playlists/Playlist'
import { Button, Image } from '@chakra-ui/react'
import useProfile from '../Helpers/useProfile'
const DashboardContent = ({
  spotifyApi,
  playlist,
  chooseTrack,
  selectedTrack,
  choosePlaylistTracks,
  accessToken,
  isShuffle,
}) => {
  const selectedPlaylistOwner = useProfile({
    spotifyApi,
    userId: playlist.owner.id,
  })
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
          <Flex flexDirection="row">
            <Box>
              {' '}
              <Image
                rounded="md"
                borderRadius="full"
                aspectRatio="1/1"
                objectFit="cover"
                src={
                  selectedPlaylistOwner
                    ? selectedPlaylistOwner.images[0].url
                    : '/assets/emptyProfile.png'
                }
                boxSize="36px"
              />
            </Box>
            <Box paddingLeft={'5px'} paddingTop={'5px'}>
              <Text fontSize="">{playlist.owner.display_name} · </Text>
            </Box>
            <Box paddingLeft={'5px'} paddingTop={'5px'}>
              <Text fontSize="">{playlist.totalTracks + ' songs'}</Text>
            </Box>
          </Flex>
          <Box>
            {/* <Text fontSize="">{playlist.totalTracks + ' s'}</Text> 
            Remove pagination as need to query all tracks to get total length*/}
          </Box>
        </Flex>
      </Flex>
      <Flex id="PlaylistContent">
        <Playlist
          playlist={playlist}
          chooseTrack={chooseTrack}
          selectedTrack={selectedTrack}
          choosePlaylistTracks={choosePlaylistTracks}
          accessToken={accessToken}
          isShuffle={isShuffle}
        ></Playlist>
      </Flex>
    </Flex>
  )
}

export default DashboardContent
