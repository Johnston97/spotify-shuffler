import { Box, Flex } from '@chakra-ui/layout'
import { useCallback, useEffect, useRef, useState } from 'react'
import useTracks from '../Helpers/useTracks'
import Track from './Track'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
} from '@chakra-ui/react'

const Playlist = ({
  spotifyApi,
  playlist,
  chooseTrack,
  selectedTrack,
  choosePlaylistTracks,
}) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [maxPageNumber, setMaxPageNumber] = useState(0)
  // const [shuffleNo, setShuffleNo] = useState(0)
  const { playlistTracks, hasMore, loading } = useTracks(
    spotifyApi,
    playlist,
    pageNumber
  )

  useEffect(() => {
    choosePlaylistTracks(playlistTracks)
  }, [playlistTracks])

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

  // Need a better helper function to dtermine if minutes, hours or days should be displayed
  function weeksBetween(d1, d2) {
    return Math.abs(Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000)))
  }

  function daysBetween(d1, d2) {
    return Math.abs(Math.round((d2 - d1) / (24 * 60 * 60 * 1000)))
  }

  return (
    <Flex
      width="100%"
      height="100%"
      bg="brand.bgDark"
      color="brand.subTitle"
      id="PlaylistTracks"
      flexDirection="column"
    >
      <TableContainer id="TableContainer">
        <Table variant="unstyled" layout="fixed">
          <Thead id="TableHead">
            <Tr color="brand.subTitle">
              <Th width={'2%'} color="brand.subTitle">
                #
              </Th>
              <Th width={'25%'} color="brand.subTitle">
                Title
              </Th>
              <Th maxWidth={'20%'} color="brand.subTitle">
                Album
              </Th>
              <Th>Date added</Th>
              <Th>Track length</Th>
            </Tr>
          </Thead>
          <Tbody id="TableBody">
            {playlistTracks.map((track, index) => {
              let selectionColour = 'brand.bgDark'
              if (selectedTrack != undefined) {
                if (track.uri === selectedTrack.uri) {
                  selectionColour = 'brand.selected'
                }
              }
              const date = new Date(track.durationMs)
              const daysSince = daysBetween(
                new Date(),
                new Date(track.dateAdded)
              )

              if (playlistTracks.length === index + 1)
                return (
                  <Tr
                    ref={lastTrackElementRef}
                    key={index}
                    bg={selectionColour}
                    onClick={() => chooseTrack(track)}
                    style={{ cursor: 'pointer' }}
                    _hover={{ bg: 'brand.hover' }}
                  >
                    <Td>
                      <Box
                        marginLeft={'7px'}
                        style={{ textAlignLast: 'right', direction: 'rtl' }}
                      >
                        {index + 1}
                      </Box>
                    </Td>
                    <Td>
                      <Flex width={'25%'}>
                        <Image
                          src={track.albumUrl}
                          style={{ height: '40px', width: '40px' }}
                        />
                        <Box paddingLeft={'10px'} paddingTop={'0px'}>
                          <Box color="brand.basicWhite">{track.title}</Box>
                          <Box>{track.artist}</Box>
                        </Box>
                      </Flex>
                    </Td>
                    <Td>{track.albumName}</Td>
                    <Td>{daysSince + ' days ago'}</Td>
                    <Td>
                      {date.getMinutes() +
                        ':' +
                        (date.getSeconds() < 10 ? '0' : '') +
                        date.getSeconds()}
                    </Td>
                  </Tr>
                )
              else {
                return (
                  <Tr
                    key={index}
                    bg={selectionColour}
                    onClick={() => chooseTrack(track)}
                    style={{ cursor: 'pointer' }}
                    _hover={{ bg: 'brand.hover' }}
                  >
                    <Td>
                      <Box
                        marginLeft={'7px'}
                        style={{ textAlignLast: 'right', direction: 'rtl' }}
                      >
                        {index + 1}
                      </Box>
                    </Td>
                    <Td>
                      <Flex width={'25%'}>
                        <Image
                          src={track.albumUrl}
                          style={{ height: '40px', width: '40px' }}
                        />
                        <Box paddingLeft={'10px'} paddingTop={'0px'}>
                          <Box color="brand.basicWhite">{track.title}</Box>
                          <Box>{track.artist}</Box>
                        </Box>
                      </Flex>
                    </Td>
                    <Td
                      overflow={'hidden'}
                      text-overflow={'ellipsis'}
                      white-space={'nowrap'}
                    >
                      {track.albumName}
                    </Td>
                    <Td>{daysSince + ' days ago'}</Td>
                    <Td>
                      {date.getMinutes() +
                        ':' +
                        (date.getSeconds() < 10 ? '0' : '') +
                        date.getSeconds()}
                    </Td>{' '}
                  </Tr>
                )
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <div>{loading && 'loading...'} </div>
    </Flex>
  )
}

export default Playlist
