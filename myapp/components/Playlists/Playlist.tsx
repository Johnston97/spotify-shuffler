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
  Text,
} from '@chakra-ui/react'
import React from 'react'

const Playlist = ({
  spotifyApi,
  playlist,
  chooseTrack,
  selectedTrack,
  choosePlaylistTracks,
}) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [maxPageNumber, setMaxPageNumber] = useState(0)
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
  const getRef = (playlistTracks, index) => {
    return playlistTracks.length === index + 1
      ? lastTrackElementRef
      : React.createRef()
  }

  // Need a better helper function to dtermine if minutes, hours or days should be displayed
  function getWeeksBetween(d1, d2) {
    return Math.abs(Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000)))
  }

  function getDaysBetween(d1, d2) {
    return Math.abs(Math.round((d2 - d1) / (24 * 60 * 60 * 1000)))
  }

  function getHoursBetween(d1, d2) {
    return Math.abs(Math.round((d2 - d1) / (60 * 60 * 1000)))
  }

  function getMinutesBetween(d1, d2) {
    return Math.abs(Math.round((d2 - d1) / (60 * 1000)))
  }

  // function secondsBetween(d1, d2) {
  //   return Math.abs(Math.round((d2 - d1) / (1000)))
  // }

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  function getDateAddedFormatted(d1, dateAdded) {
    const d2 = new Date(dateAdded)
    const minutesBetween = getMinutesBetween(d1, d2)
    if (minutesBetween < 60) {
      return minutesBetween + ' minutes ago'
    }
    const hoursBetween = getHoursBetween(d1, d2)
    if (hoursBetween < 24) {
      return hoursBetween + ' hours ago'
    }
    const daysBetween = getDaysBetween(d1, d2)
    if (daysBetween < 7) {
      return daysBetween + ' days ago'
    }
    const weeksBetween = getWeeksBetween(d1, d2)
    if (weeksBetween < 4) {
      return weeksBetween + ' weeks ago'
    }
    const date = dateAdded.split('T')[0]
    const [year, month, day] = date.split('-')
    return monthNames[month - 1] + ' ' + day + ', ' + year
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
              const dateAdded = getDateAddedFormatted(
                new Date(),
                track.dateAdded
              )

              return (
                <Tr
                  ref={getRef(playlistTracks, index)}
                  key={index}
                  bg={selectionColour}
                  onClick={() => chooseTrack(track)}
                  style={{ cursor: 'pointer' }}
                  _hover={{ bg: 'brand.hover' }}
                  id="PlaylistRow"
                >
                  <Td id="TrackIndexData" rounded="md">
                    <Box
                      verticalAlign={'middle'}
                      marginLeft={'7px'}
                      style={{ textAlignLast: 'right', direction: 'rtl' }}
                    >
                      {index + 1}
                    </Box>
                  </Td>
                  <Td id="TrackData">
                    <Flex width={'100%'}>
                      <Image
                        rounded="md"
                        src={track.albumUrl}
                        style={{ height: '40px', width: '40px' }}
                      />
                      <Box
                        paddingLeft={'10px'}
                        paddingTop={'0px'}
                        maxWidth={'100%'}
                      >
                        <Box color="brand.basicWhite">
                          <Text isTruncated>{track.title}</Text>
                        </Box>
                        <Box>
                          <Text isTruncated>{track.artist}</Text>
                        </Box>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Text isTruncated>{track.albumName}</Text>
                  </Td>
                  <Td>{dateAdded}</Td>
                  <Td rounded="md">
                    {date.getMinutes() +
                      ':' +
                      (date.getSeconds() < 10 ? '0' : '') +
                      date.getSeconds()}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <div>{loading && 'loading...'} </div>
    </Flex>
  )
}

export default Playlist
