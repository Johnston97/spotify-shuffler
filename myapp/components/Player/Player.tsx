import { Box } from '@chakra-ui/layout'
import React from 'react'
// import SpotifyPlayer from '../../../react-spotify-web-playback/dist/index.js'
import WebPlayback from '../Player/WebPlayback'

const Player = ({
  accessToken,
  selectedTrack,
  spotifyApi,
  selectedPlaylist,
  chooseTrack,
  selectedPlaylistTracks,
}) => {
  if (!accessToken) return null

  return (
    <Box
      width="100%"
      bg="rgba(0,0,0,255)"
      paddingX="0px"
      color="gray"
      id="PlayerContainer"
    >
      <WebPlayback
        accessToken={accessToken}
        selectedPlaylist={selectedPlaylist}
        selectedTrack={selectedTrack}
        spotifyApi={spotifyApi}
        chooseTrack={chooseTrack}
        selectedPlaylistTracks={selectedPlaylistTracks}
      />
    </Box>
  )
}

export default Player
