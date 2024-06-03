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
  myProfile,
  accessToken,
}) => {
  console.log(playlist)
  if (playlist) {
    return (
      <Flex
        id="DashboardContainer"
        bg="brand.bgDark"
        width="calc(100vw - 600px)"
        margin="10px"
        flexDirection="column"
        rounded="md"
        overflow="hidden"
      >
        <Box id="SearchBarWrapper">
          <SearchBar myProfile={myProfile} />
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
            accessToken={accessToken}
          />
        </Box>
      </Flex>
    )
  } else {
    return (
      <Flex
        id="DashboardContainer"
        bg="brand.bgDark"
        width="calc(100vw - 600px)"
        margin="10px"
        flexDirection="column"
        rounded="md"
        overflow="hidden"
      >
        <Box id="SearchBarWrapper">
          <SearchBar myProfile={myProfile} />
        </Box>
        <Box
          id="DashboardContentWrapper"
          height="100%"
          overflow="auto"
          css={scrollBar}
        ></Box>
      </Flex>
    )
  }
}

export default Dashboard
