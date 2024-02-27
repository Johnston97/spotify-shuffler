import React from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'

export default function Login({ authUrl }) {
  return (
    <Flex width="100vw" height="100vh" bg="brand.bgDark">
      <Box margin="auto">
        <Button display="flex" as="a" href={authUrl.toString()}>
          Login With Spotify
        </Button>
      </Box>
    </Flex>
  )
}
