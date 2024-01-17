import { Box } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
// import SpotifyPlayer from '../../../react-spotify-web-playback/dist/index.js'
import WebPlayback from '../Player/WebPlayback'

const Player = ({
  accessToken,
  selectedTrack,
  spotifyApi,
  selectedPlaylist,
  chooseTrack,
}) => {
  const [play, setPlay] = useState(false)
  useEffect(() => setPlay(true), [selectedTrack])
  if (!accessToken) return null

  return (
    <Box
      width="100%"
      bg="lavenderblush"
      paddingX="0px"
      color="gray"
      id="PlayerContainer"
    >
      {/* <SpotifyPlayer
        hideAttribution={true}
        hideCoverArt={true}
        token={accessToken}
        showSaveIcon={false}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={track.trackUri ? [track.trackUri] : []}
      /> */}
      <WebPlayback
        accessToken={accessToken}
        play={play}
        selectedPlaylist={selectedPlaylist}
        selectedTrack={selectedTrack}
        spotifyApi={spotifyApi}
        chooseTrack={chooseTrack}
      />
    </Box>
  )
}

export default Player
