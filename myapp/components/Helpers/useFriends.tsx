import { useState, useEffect, useCallback } from 'react'

export default function useFriends() {
  const [friendActivity, setFriendActivity] = useState([])

  const getFriendActivity = useCallback(async () => {
    const payload = {
      method: 'GET',
    }
    const getActivity = () => {
      fetch('http://localhost:3000/api/friends', payload)
        .then(async (res) => {
          const response = await res.json()
          const friendActivity = response.friends
          friendActivity.sort((x, y) => {
            return y.timestamp - x.timestamp
          })
          if (friendActivity.length > 0) {
            console.log('setting freind activity)')
            setFriendActivity(friendActivity)
          }
        })
        .catch((e) => {
          console.log(e)
          setTimeout(() => {}, 60000)
          return
        })
    }
    if (friendActivity.length === 0) {
      console.log('No friend activity')
    }
    const interval = setInterval(getActivity, 60000)
    return () => {
      console.log('REFRESHING ACTIVITY LSIT')
      clearInterval(interval)
    }
  }, [friendActivity])

  useEffect(() => {
    getFriendActivity()
  }, [getFriendActivity])

  return friendActivity
}
