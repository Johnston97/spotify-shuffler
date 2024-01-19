import { Box, Flex } from '@chakra-ui/layout'
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
        <Box id="Home" height="10%" bg="honeydew" margin="10px">
          Home
        </Box>
        <Box
          id="PlaylistsWrapper"
          height="90%"
          bg="$spotify-dark-grey"
          margin="10px"
          overflow="auto"
          color={'white'}
          css={scrollBar}
        >
          Playlists
          {/*{playlists.map((playlist: any) => {*/}
          <Playlists
            playlists={playlists}
            choosePlaylist={choosePlaylist}
            selectedPlaylist={selectedPlaylist}
          ></Playlists>
          {/*<PlaylistOverview playlist={playlist}/>*/}
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
