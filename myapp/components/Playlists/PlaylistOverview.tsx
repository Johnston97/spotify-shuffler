import { Box, Flex } from '@chakra-ui/layout'

const PlaylistOverview = ({ playlist, choosePlaylist, selectedPlaylist }) => {
  function handleSelection() {
    choosePlaylist(playlist)
  }

  if (selectedPlaylist.name == playlist.name) {
    return (
      <Box id="PlaylistOverview">
        <Flex id="SelectedPlaylist" height="64px" bg="sienna" margin="10px">
          <Box>
            <img
              src={playlist.albumUrl}
              style={{ height: '64px', width: '64px' }}
            />
          </Box>
          <Box bg="yellow" margin="auto">
            {playlist.name}
          </Box>
        </Flex>
      </Box>
    )
  }
  return (
    <Box id="PlaylistOverview">
      <Flex
        id="Playlist"
        height="64px"
        bg="sienna"
        margin="10px"
        style={{ cursor: 'pointer' }}
        onClick={handleSelection}
      >
        <Box>
          <img
            src={playlist.albumUrl}
            style={{ height: '64px', width: '64px' }}
          />
        </Box>
        <Box bg="lavender" margin="auto">
          {playlist.name}
        </Box>
      </Flex>
    </Box>
  )
}

export default PlaylistOverview
