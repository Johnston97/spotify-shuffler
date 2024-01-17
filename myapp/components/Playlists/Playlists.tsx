import { Flex } from '@chakra-ui/layout'
import PlaylistOverview from './PlaylistOverview'

const Playlists = ({ playlists, choosePlaylist, selectedPlaylist }) => {
  return (
    <Flex
      width="100%"
      // height="100%"
      bg="green"
      paddingX="0px"
      color="gray"
      // bottom="0"
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
