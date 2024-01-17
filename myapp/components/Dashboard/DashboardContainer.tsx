import { Box, Flex } from '@chakra-ui/layout'
import SideBar from '../SideBar/SideBar'
import FeedBar from '../SideBar/FeedBar'
import PlayBarContainer from '../Player/PlayBarContainer'
import Dashboard from './Dashboard'
import SpotifyWebApi from 'spotify-web-api-node'
import { useMemo, useState } from 'react'
import usePlaylists from '../Helpers/usePlaylists'

const redirectUri = process.env.REDIRECT_URI,
  clientId = process.env.CLIENT_ID,
  clientSecret = process.env.CLIENT_SECRET

const credentials = {
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
}

const spotifyApi = new SpotifyWebApi(credentials)

const DashboardContainer = ({ accessToken }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  const [selectedTrack, setSelectedTrack] = useState('')

  function choosePlaylist(playlist) {
    setSelectedPlaylist(playlist)
  }

  function chooseTrack(track) {
    setSelectedTrack(track)
  }

  useMemo(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  const playlists = usePlaylists({ spotifyApi })

  if (playlists.length != 0) {
    return (
      <Box width="100vw" height="100vh" bg="black" id="PageWrapper">
        <Flex id="ApplicationWrapper" width="100%" height="90%">
          <SideBar
            playlists={playlists}
            choosePlaylist={choosePlaylist}
            selectedPlaylist={selectedPlaylist}
          ></SideBar>
          <Dashboard
            spotifyApi={spotifyApi}
            playlist={selectedPlaylist}
            chooseTrack={chooseTrack}
            selectedTrack={selectedTrack}
          ></Dashboard>
          <FeedBar></FeedBar>
        </Flex>
        <Flex id="PlayerWrapper" width="100vw" height="10%">
          <PlayBarContainer
            accessToken={accessToken}
            selectedPlaylist={selectedPlaylist}
            chooseTrack={chooseTrack}
            selectedTrack={selectedTrack}
            spotifyApi={spotifyApi}
          />
        </Flex>
      </Box>
    )
  } else {
    return (
      <Box width="100vw" height="100vh" bg="black" id="PageWrapper">
        <Flex id="ApplicationWrapper" width="100%" height="90%">
          <SideBar></SideBar>
          <Dashboard></Dashboard>
          <FeedBar></FeedBar>
        </Flex>
        <Box id="PlayerWrapper" width="100vw" height="10%">
          <PlayBarContainer />
        </Box>
      </Box>
    )
  }
}

export default DashboardContainer
