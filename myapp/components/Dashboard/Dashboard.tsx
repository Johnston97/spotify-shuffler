import { Box, Flex } from '@chakra-ui/layout'
import SearchBar from './SearchBar'
import DashboardContent from './DashboardContent'

const Dashboard = ({ spotifyApi, playlist, chooseTrack, selectedTrack }) => {
  return (
    <Flex
      id="DashboardContainer"
      bg="darkblue"
      width="calc(100vw - 600px)"
      margin="10px"
      flexDirection="column"
    >
      <Box id="SearchBarWrapper">
        <SearchBar />
      </Box>
      <Box id="DashboardContentWrapper" height="100%" overflow="auto">
        <DashboardContent
          spotifyApi={spotifyApi}
          playlist={playlist}
          chooseTrack={chooseTrack}
          selectedTrack={selectedTrack}
        />
      </Box>
    </Flex>
  )
}

export default Dashboard
