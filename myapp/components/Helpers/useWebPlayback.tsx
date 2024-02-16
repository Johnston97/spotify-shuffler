import { useEffect, useState } from 'react'

const useWebPlayback = (accessToken: string, shuffle: boolean) => {
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
        player.activateElement()
        setActive(true)
        setDeviceId(device_id)
      })

      player.addListener('autoplay_failed', () => {
        console.log('Autoplay is not allowed by the browser autoplay rules')
      })

      player.on('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message)
      })

      player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message)
      })

      player.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message)
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
        setActive(false)
        setDeviceId('')
      })

      // Works from other pc, how to trigger from app?
      player.addListener('player_state_changed', (state) => {
        // console.log('State change', state)
        if (!state) {
          return
        }
        console.log('Currently playing', state.track_window.current_track.name)
        setPaused(state.paused)

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      player.connect()
    }
    return () => {
      if (player) {
        player.removeListener('ready')
        player.removeListener('not_ready')
        player.removeListener('player_state_changed')
        setPaused(true)
        player.disconnect()
      }
    }
  }, [])

  return { player, deviceId, isActive, isPaused }
}

export default useWebPlayback
