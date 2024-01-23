import { Box, Flex } from '@chakra-ui/layout'
import SearchBar from './SearchBar'
import DashboardContent from './DashboardContent'
import scrollBar from '../../styles/scrollBar.json'

const Dashboard = ({
  spotifyApi,
  playlist,
  chooseTrack,
  selectedTrack,
  choosePlaylistTracks,
}) => {
  return (
    <Flex
      id="DashboardContainer"
      bg="brand.bgDark"
      width="calc(100vw - 600px)"
      margin="10px"
      flexDirection="column"
    >
      <Box id="SearchBarWrapper">
        <SearchBar />
      </Box>
      <Box
        id="DashboardContentWrapper"
        height="100%"
        overflow="auto"
        css={scrollBar}
      >
        <DashboardContent
          spotifyApi={spotifyApi}
          playlist={playlist}
          chooseTrack={chooseTrack}
          selectedTrack={selectedTrack}
          choosePlaylistTracks={choosePlaylistTracks}
        />
      </Box>
    </Flex>
  )
}

export default Dashboard
