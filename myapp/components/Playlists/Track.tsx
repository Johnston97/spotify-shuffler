import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'

export default function Track({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <Flex
      flexDirection="row"
      style={{ cursor: 'pointer' }}
      onClick={handlePlay}
      _hover={{ bg: 'brand.hover' }}
      color={'white'}
    >
      <tr>
        <td>0</td>
        <td>
          <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
          {track.title}
          {track.artist}
        </td>
        <td>album</td>
        <td>trackLength</td>
      </tr>
      {/* <Box id="h5">{track.title}</Box>
      <Box id="">{track.artist}</Box> */}
    </Flex>
  )
}
