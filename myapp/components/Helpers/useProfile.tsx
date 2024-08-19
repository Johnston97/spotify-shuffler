import { useEffect, useState } from 'react'

export default function useProfile({ spotifyApi, userId }) {
  const [profile, setProfile] = useState(null)
  // console.log('GETTING OWNER', userId)

  useEffect(() => {
    // console.log('GETTING OWNER2ewewr')
    if (!userId) return
    async function getUser() {
      await spotifyApi.getUser(userId).then((res) => {
        console.log(res.body)
        setProfile(res.body)
      })
    }
    getUser()
  }, [])
  return profile
}
