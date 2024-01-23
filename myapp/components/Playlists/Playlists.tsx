import { Flex } from '@chakra-ui/layout'
import PlaylistOverview from './PlaylistOverview'

const Playlists = ({ playlists, choosePlaylist, selectedPlaylist }) => {
  return (
    <Flex
      width="100%"
      bg="brand.bgDark"
      paddingX="0px"
      color="gray"
      id="Playlists"
      flexDirection="column"
    >
      {playlists.map((playlist) => (
        <PlaylistOverview
          key={playlist.name}
          playlist={playlist}
          choosePlaylist={choosePlaylist}
          selectedPlaylist={selectedPlaylist}
        />
      ))}
    </Flex>
  )
}

export default Playlists
