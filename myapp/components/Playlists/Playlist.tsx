import { Box, Flex } from '@chakra-ui/layout'
import { useCallback, useEffect, useRef, useState } from 'react'
import useTracks from '../Helpers/useTracks'
import Track from './Track'

const Playlist = ({ spotifyApi, playlist, chooseTrack, selectedTrack }) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [maxPageNumber, setMaxPageNumber] = useState(0)
  // const [shuffleNo, setShuffleNo] = useState(0)
  const { playlistTracks, hasMore, loading } = useTracks(
    spotifyApi,
    playlist,
    pageNumber
  )

  // const track = useTrack(spotifyApi, playlist, shuffleNo)

  useEffect(() => {
    setMaxPageNumber(playlist.totalTracks / 15 - 1)
    setPageNumber(0)
  }, [playlist])

  const observer = useRef(null)
  const lastTrackElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('visible')
          if (pageNumber < maxPageNumber) {
            setPageNumber(pageNumber + 1)
          }
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <Flex
      width="100%"
      height="100%"
      bg="azure"
      color="gray"
      id="PlaylistTracks"
      flexDirection="column"
    >
      {playlistTracks.map((track, index) => {
        let selectionColour = 'white'
        if (selectedTrack != undefined) {
          if (track.uri === selectedTrack.uri) {
            selectionColour = 'black'
          }
        }
        if (playlistTracks.length === index + 1)
          return (
            <Box ref={lastTrackElementRef} key={index} bg={selectionColour}>
              <Track track={track} chooseTrack={chooseTrack} />
            </Box>
          )
        else {
          return (
            <Box key={index} bg={selectionColour}>
              <Track track={track} chooseTrack={chooseTrack} />
            </Box>
          )
        }
      })}
      <div>{loading && 'loading...'} </div>
    </Flex>
  )
}

export default Playlist
