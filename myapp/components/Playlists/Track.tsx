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
      <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
      <Box id="ml-3">
        <Box id="h5">{track.title}</Box>
        <Box id="">{track.artist}</Box>
      </Box>
    </Flex>
  )
}
