import { Box, Flex } from '@chakra-ui/layout'

const PlaylistOverview = ({ playlist, choosePlaylist, selectedPlaylist }) => {
  function handleSelection() {
    choosePlaylist(playlist)
  }

  if (selectedPlaylist.name == playlist.name) {
    return (
      <Box id="PlaylistOverview">
        <Flex
          id="SelectedPlaylist"
          height="64px"
          bg="brand.selected"
          margin="10px"
          color={'white'}
        >
          <Box>
            <img
              src={playlist.albumUrl}
              style={{ height: '64px', width: '64px' }}
            />
          </Box>
          <Box margin="auto">{playlist.name}</Box>
        </Flex>
      </Box>
    )
  }
  return (
    <Box id="PlaylistOverview">
      <Flex
        id="Playlist"
        height="64px"
        bg="$spotify-dark-grey"
        margin="10px"
        style={{ cursor: 'pointer' }}
        onClick={handleSelection}
        _hover={{ bg: 'brand.hover' }}
        color={'white'}
      >
        <Box>
          <img
            src={playlist.albumUrl}
            style={{ height: '64px', width: '64px' }}
          />
        </Box>
        <Box margin="auto" textAlign={'left'}>
          {playlist.name}
        </Box>
      </Flex>
    </Box>
  )
}

export default PlaylistOverview
