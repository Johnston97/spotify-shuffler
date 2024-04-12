import { useEffect, useState } from 'react'

export default function useMyProfile({ spotifyApi }) {
  const [myProfile, setMyProfile] = useState(null)

  useEffect(() => {
    if (!spotifyApi.getCredentials().accessToken) return
    spotifyApi.getMe().then((res) => {
      setMyProfile(res.body)
    })
  }, [spotifyApi])
  return myProfile
}
