import Login from './Login'
import SpotifyWebApi from 'spotify-web-api-node'
import DashboardContainer from './Dashboard/DashboardContainer'
import useAuth from './Helpers/useAuth'
import { useCallback, useEffect, useState } from 'react'

const spotifyApi = new SpotifyWebApi()
// const api = buddyList.wrapWebApi(new SpotifyWebApi({ spDcCookie: process.env.SP_DC }))
function App() {
  const [authUrl, setAuthUrl] = useState('')

  const getAuthenticationURL = useCallback(async () => {
    // Loses state due to redirect from spotify login
    if (authUrl) return
    fetch('http://localhost:3000/api/auth', { method: 'GET' })
      .then(async (res) => {
        const authUrlResponse = await res.json()
        console.log(authUrlResponse)
        setAuthUrl(authUrlResponse)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    getAuthenticationURL()
  }, [getAuthenticationURL])

  const accessToken = useAuth()
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken)
  }
  return accessToken ? (
    <DashboardContainer spotifyApi={spotifyApi} accessToken={accessToken} />
  ) : (
    <Login authUrl={authUrl} />
  )
}

export default App
