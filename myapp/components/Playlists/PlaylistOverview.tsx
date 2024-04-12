import { Box, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

const PlaylistOverview = ({ playlist, choosePlaylist, selectedPlaylist }) => {
  function handleSelection() {
    choosePlaylist(playlist)
  }

  if (selectedPlaylist && selectedPlaylist.name == playlist.name) {
    return (
      <Box id="PlaylistOverview" rounded="md" overflow="hidden">
        <Flex
          id="SelectedPlaylist"
          height="64px"
          bg="brand.selected"
          margin="10px"
          color={'white'}
          width="calc(100% - 10px)"
          rounded="md"
          overflow="hidden"
        >
          <Box>
            <Image
              rounded="md"
              src={playlist.albumUrl}
              style={{ height: '60px', width: '60px' }}
            />
          </Box>
          <Box margin="auto">{playlist.name}</Box>
        </Flex>
      </Box>
    )
  }
  return (
    <Flex
      id="PlaylistOverview"
      height="64px"
      bg="brand.bgDark"
      margin="10px"
      style={{ cursor: 'pointer' }}
      onClick={handleSelection}
      _hover={{ bg: 'brand.hover' }}
      color={'white'}
      width="calc(100% - 10px)"
      rounded="md"
      overflow="hidden"
    >
      <Box>
        <Image
          rounded="md"
          src={playlist.albumUrl}
          style={{ height: '60px', width: '60px' }}
        />
      </Box>
      <Box margin="auto" textAlign={'left'}>
        {playlist.name}
      </Box>
    </Flex>
  )
}

export default PlaylistOverview
