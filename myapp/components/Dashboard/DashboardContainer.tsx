import { Box, Flex } from '@chakra-ui/layout'
import SideBar from '../SideBar/SideBar'
import FeedBar from '../SideBar/FeedBar'
import PlayBarContainer from '../Player/PlayBarContainer'
import Dashboard from './Dashboard'
import { useState } from 'react'
import usePlaylists from '../Helpers/usePlaylists'
import useMyProfile from '../Helpers/useMyProfile'
import useProfile from '../Helpers/useProfile'

const DashboardContainer = ({ spotifyApi, accessToken }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState('')
  const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState('')
  const myProfile = useMyProfile({ spotifyApi })

  function choosePlaylist(playlist) {
    setSelectedPlaylist(playlist)
  }

  function chooseTrack(track) {
    console.log('Selected track', track)
    setSelectedTrack(track)
  }

  function choosePlaylistTracks(playlistTracks) {
    setSelectedPlaylistTracks(playlistTracks)
  }

  // useMemo(() => {
  //   if (!accessToken) return
  //   spotifyApi.setAccessToken(accessToken)
  // }, [accessToken])

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
            choosePlaylistTracks={choosePlaylistTracks}
            myProfile={myProfile}
          ></Dashboard>
          <FeedBar></FeedBar>
        </Flex>
        <Flex id="PlayerWrapper" width="100vw" height="10%">
          <PlayBarContainer
            accessToken={accessToken}
            selectedPlaylist={selectedPlaylist}
            selectedPlaylistTracks={selectedPlaylistTracks}
            chooseTrack={chooseTrack}
            selectedTrack={selectedTrack}
            spotifyApi={spotifyApi}
          />
        </Flex>
      </Box>
    )
  }
}

export default DashboardContainer
