import { Box, Flex, Text } from '@chakra-ui/layout'
import Playlists from '../Playlists/Playlists'
import scrollBar from '../../styles/scrollBar.json'

const SideBar = ({ playlists, choosePlaylist, selectedPlaylist }) => {
  if (playlists != undefined) {
    return (
      <Flex
        bg=""
        width="300px"
        margin="10px"
        flexDirection="column"
        id="SideBarWrapper"
      >
        <Box id="Home" height="10%" bg="brand.bgDark" margin="10px">
          Home
        </Box>
        <Box
          id="PlaylistsWrapper"
          height="90%"
          bg="brand.bgDark"
          // marginLeft="10px"
          overflow="auto"
          overflowX="hidden"
          color={'white'}
          css={scrollBar}
          rounded="md"
        >
          {/* <Text marginLeft="10px">Playlists</Text> */}
          <Playlists
            playlists={playlists}
            choosePlaylist={choosePlaylist}
            selectedPlaylist={selectedPlaylist}
          ></Playlists>
        </Box>
      </Flex>
    )
  } else {
    return (
      <Flex
        bg="rebeccapurple"
        width="300px"
        margin="10px"
        flexDirection="column"
        id="SideBarWrapper"
      >
        <Box id="Home" height="10%" bg="honeydew" margin="10px">
          Home
        </Box>
        <Box id="Playlists" height="90%" bg="sienna" margin="10px">
          Playlists
        </Box>
      </Flex>
    )
  }
}

export default SideBar
