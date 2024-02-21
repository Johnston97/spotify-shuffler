import React from 'react'
import NextLink from 'next/link'
import { Box, Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'

const authEndpoint = 'https://accounts.spotify.com/authorize'
const redirectUri = 'http://localhost:3000'
const clientId = '436ac09d658f4723a59c3c3b9f0bf5ee'
const scopes = [
  'streaming',
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
]

const AUTH_URL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=false`

export default function Login() {
  return (
    <Flex width="100vw" height="100vh" bg="brand.bgDark">
      <NextLink href={AUTH_URL}>
        <Box margin="auto">
          <Button display="flex">Login With Spotify</Button>
        </Box>
      </NextLink>
    </Flex>
  )
}
