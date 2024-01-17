import { useEffect, useState } from 'react'

const useWebPlayback = (accessToken: string) => {
  const [player, setPlayer] = useState(undefined)
  const [deviceId, setDeviceId] = useState('')
  const [isPaused, setPaused] = useState(false)
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    // Pass in a list of track uris
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(accessToken)
        },
        volume: 0.5,
      })

      setPlayer(player)

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        setActive(true)
        setDeviceId(device_id)
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
        setActive(false)
        setDeviceId('')
      })

      // Works from other pc, how to trigger from app?
      player.addListener('player_state_changed', (state) => {
        console.log('State change')
        if (!state) {
          return
        }
        setPaused(state.paused)

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      player.connect()
    }
  }, [])

  return { player, deviceId, isActive, isPaused }
}

export default useWebPlayback
