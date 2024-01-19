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
  selectedPlaylistTracks,
}: WebPlayBackProps) => {
  const [nextTrack, setNextTrack] = useState()
  const [previousTrack, setPreviousTrack] = useState()

  const { player, deviceId, isActive, isPaused } = useWebPlayback(accessToken)

  useEffect(() => {
    if (!selectedTrack || !deviceId || !isActive) return
    console.log(selectedTrack, deviceId, isActive)
    if (nextTrack) {
      selectedTrack = nextTrack
    }
    if (previousTrack) {
      selectedTrack = previousTrack
    }
    setNextTrack(undefined)
    setPreviousTrack(undefined)
    chooseTrack(selectedTrack)
    playSong(
      selectedTrack.uri,
      spotifyApi,
      deviceId,
      selectedPlaylist.uri,
      player
    )
  }, [selectedTrack, nextTrack, previousTrack, isActive])

  if (!isActive) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b> Player is not active </b>
          </div>
        </div>
      </>
    )
  }
  if (!selectedTrack) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b> Please select a track </b>
          </div>
        </div>
      </>
    )
  } else {
    // Need to disablee prev and next if at start ior end of list
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
              <Box className="now-playing__name" color="white">
                {selectedTrack.title}
              </Box>
              <Box className="now-playing__artist">{selectedTrack.artist}</Box>
            </div>
          </Box>
        </Flex>
        <Flex id="Player" width="60%" justifyContent="center">
          {/* <button
            className="btn-spotify"
            onClick={() => {
              const index = getTrackIndex(selectedTrack, selectedPlaylistTracks)
              setPreviousTrack(selectedPlaylistTracks[index - 1])
              // player.previousTrack()
            }}
          >
            &lt;&lt;
          </button> */}
          <Flex>
            {' '}
            <button
              className="btn-spotify"
              onClick={() => {
                player.togglePlay()
              }}
            >
              {isPaused ? 'PLAY' : 'PAUSE'}
            </button>
          </Flex>
          {/* <button
            className="btn-spotify"
            onClick={() => {
              const index = getTrackIndex(selectedTrack, selectedPlaylistTracks)
              setNextTrack(selectedPlaylistTracks[index + 1])
              // player.nextTrack()
            }}
          >
            &gt;&gt;
          </button> */}
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
  spotifyApi: SpotifyWebApi,
  deviceId: string,
  contextUri: string,
  player: any
) {
  player.activateElement()
  spotifyApi.play({
    context_uri: contextUri,
    device_id: deviceId,
    offset: { uri },
  })
  console.log(uri, contextUri, deviceId)
}

function getTrackIndex(track, playlistTracks) {
  for (let i = 0; i < playlistTracks.length; i++) {
    if (playlistTracks[i].uri == track.uri) {
      return i
    }
  }
}

interface WebPlayBackProps {
  accessToken: any
  selectedTrack: any
  spotifyApi: SpotifyWebApi
  selectedPlaylist: any
  chooseTrack: any
  selectedPlaylistTracks: any
}

export default WebPlayback
