import { Box, Flex } from '@chakra-ui/layout'
import { useCallback, useEffect, useRef, useState } from 'react'
import useTracks from '../Helpers/useTracks'
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
import { getDateAddedFormatted } from '../Helpers/dates'

const Playlist = ({
  playlist,
  chooseTrack,
  selectedTrack,
  choosePlaylistTracks,
  accessToken,
  isShuffle,
}) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [maxPageNumber, setMaxPageNumber] = useState(0)
  const { playlistTracks, hasMore, loading } = useTracks(
    playlist,
    accessToken,
    pageNumber,
    isShuffle
  )
  const [tableData, setTableData] = useState([])
  const [sortField, setSortField] = useState('')
  const [order, setOrder] = useState('asc')

  useEffect(() => {
    choosePlaylistTracks(playlistTracks)
    if (playlistTracks.length > 0) {
      setTableData(
        playlistTracks.map((track) => {
          const date = new Date(track.durationMs)
          const formattedDateAdded = getDateAddedFormatted(
            new Date(),
            track.dateAdded
          )
          const trackLength =
            date.getMinutes() +
            ':' +
            (date.getSeconds() < 10 ? '0' : '') +
            date.getSeconds()
          return {
            title: track.title,
            uri: track.uri,
            artist: track.artist,
            albumName: track.albumName,
            albumUrl: track.albumUrl,
            dateAdded: track.dateAdded,
            formattedDateAdded: formattedDateAdded,
            trackLength,
          }
        })
      )
    }
  }, [playlistTracks])

  useEffect(() => {
    setMaxPageNumber(playlist.totalTracks / 15 - 1)
    setPageNumber(0)
    setTableData([])
  }, [playlist, isShuffle])

  const observer = useRef(null)
  const lastTrackElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
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

  const handleSortingChange = (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc'
    setSortField(accessor)
    setOrder(sortOrder)
    handleSorting(accessor, sortOrder)
  }

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        )
      })
      setTableData(sorted)
    }
  }

  const getSortIcon = (accessor) => {
    const cl =
      sortField === accessor && order === 'asc'
        ? '▲'
        : sortField === accessor && order === 'desc'
        ? '▼'
        : ''
    return cl
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
      <RenderTable
        tableData={tableData}
        isLoading={loading}
        handleSortingChange={handleSortingChange}
        getSortIcon={getSortIcon}
        selectedTrack={selectedTrack}
        getRef={getRef}
        chooseTrack={chooseTrack}
        playlistTracks={playlistTracks}
      ></RenderTable>
      <div>{loading && 'loading...'} </div>
    </Flex>
  )
}

function RenderTable(props) {
  const {
    tableData,
    loading,
    handleSortingChange,
    getSortIcon,
    selectedTrack,
    getRef,
    chooseTrack,
    playlistTracks,
  } = props
  if (tableData.length > 0) {
    // TODO: Playlist description
    // TODO: Default sort
    return (
      <TableContainer id="TableContainer">
        <Table variant="unstyled" layout="fixed">
          {
            <Thead id="TableHead">
              <Tr color="brand.subTitle">
                <Th width={'2%'} color="brand.subTitle">
                  #
                </Th>
                <Th
                  width={'25%'}
                  color="brand.subTitle"
                  onClick={() => handleSortingChange('title')}
                >
                  <Text _hover={{ color: 'white' }}>
                    Title {getSortIcon('title')}
                  </Text>
                </Th>
                <Th
                  maxWidth={'20%'}
                  color="brand.subTitle"
                  onClick={() => handleSortingChange('albumName')}
                >
                  <Text _hover={{ color: 'white' }}>
                    Album {getSortIcon('albumName')}
                  </Text>
                </Th>
                <Th onClick={() => handleSortingChange('dateAdded')}>
                  <Text _hover={{ color: 'white' }}>
                    Date added {getSortIcon('dateAdded')}
                  </Text>
                </Th>
                <Th onClick={() => handleSortingChange('trackLength')}>
                  <Text _hover={{ color: 'white' }}>
                    Track length {getSortIcon('trackLength')}
                  </Text>
                </Th>
              </Tr>
            </Thead>
          }
          <Tbody id="TableBody">
            {tableData.map((track, index) => {
              let selectionColour = 'brand.bgDark'
              if (selectedTrack != undefined) {
                if (track.uri === selectedTrack.uri) {
                  selectionColour = 'brand.selected'
                }
              }
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
                  <Td>{track.formattedDateAdded}</Td>
                  <Td rounded="md">{track.trackLength}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    )
  } else {
    return <Flex>{loading ? 'Loading' : ''}</Flex>
  }
}

export default Playlist
