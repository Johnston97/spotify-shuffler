import { Box, Flex } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import useWebPlayback from '../Helpers/useWebPlayback'

const WebPlayback = ({
  accessToken,
  selectedTrack,
  spotifyApi,
  selectedPlaylist,
  chooseTrack,
}: WebPlayBackProps) => {
  // const [currentTrack, setTrack] = useState(selectedTrack)

  useEffect(() => {
    if (!selectedTrack) return
    console.log(selectedPlaylist)
    console.log(selectedTrack)
    // setTrack(selectedTrack)
    chooseTrack(selectedTrack)
    playSong(
      selectedTrack.uri,
      accessToken,
      spotifyApi,
      deviceId,
      selectedPlaylist.uri
    )
  }, [selectedTrack])

  const { player, deviceId, isActive, isPaused } = useWebPlayback(accessToken)

  if (!isActive || !selectedTrack) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              {' '}
              Instance not active. Transfer your playback using your Spotify app{' '}
            </b>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <Flex id="WebPlaybackContainer" height="100%">
        <Flex id="Track" width="15%">
          <Box id="AlbumCover" paddingTop="15px" paddingLeft="15px">
            <img
              src={selectedTrack.albumUrl}
              className="now-playing__cover"
              alt=""
            />
          </Box>
          <Box id="TrackInfo" paddingTop="20px" paddingLeft="15px">
            <div className="now-playing__side">
              <div className="now-playing__name">{selectedTrack.title}</div>
              <div className="now-playing__artist">{selectedTrack.artist}</div>
            </div>
          </Box>
        </Flex>
        <Flex id="Player" width="60%" justifyContent="center">
          <button
            className="btn-spotify"
            onClick={() => {
              player.previousTrack()
            }}
          >
            &lt;&lt;
          </button>
          <button
            className="btn-spotify"
            onClick={() => {
              player.togglePlay()
            }}
          >
            {isPaused ? 'PLAY' : 'PAUSE'}
          </button>
          <button
            className="btn-spotify"
            onClick={() => {
              player.nextTrack()
            }}
          >
            &gt;&gt;
          </button>
        </Flex>
        <Box id="Utils" width="20%">
          Utils
        </Box>
      </Flex>
    )
  }
}

function playSong(
  uri,
  token,
  spotifyApi: SpotifyWebApi,
  deviceId: string,
  contextUri: string
) {
  spotifyApi.play({
    context_uri: contextUri,
    device_id: deviceId,
    offset: { uri },
  })
}

interface WebPlayBackProps {
  accessToken: any
  selectedTrack: any
  spotifyApi: SpotifyWebApi
  selectedPlaylist: any
  chooseTrack: any
}

export default WebPlayback
