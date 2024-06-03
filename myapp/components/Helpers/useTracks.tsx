import { useCallback, useEffect, useState } from 'react'

// const limit = 15

export default function useTracks(playlist, accessToken) {
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setPlaylistTracks([])
    setHasMore(true)
    console.log(
      'Getting teacks for playlsit' + JSON.stringify(playlist) + accessToken
    )
  }, [playlist])

  const payload = {
    method: 'GET',
    headers: {
      accessToken,
      playlistId: playlist.id,
      totalTracks: playlist.totalTracks,
    },
  }

  // Remove pagination for other features
  const getPlaylistTracks = useCallback(async () => {
    const getTracks = () => {
      fetch('http://localhost:3000/api/playlistTracks', payload)
        .then(async (res) => {
          const response = await res.json()
          console.log(response)
          if (response.length > 0) {
            setPlaylistTracks(response)
          }
        })
        .catch((e) => {
          console.log(e)
          return
        })
    }
    getTracks()
    if (playlistTracks.length === 0) {
      console.log('No tracks for playlist')
    }
    // const interval = setInterval(getActivity, 60000)
    // return () => {
    //   console.log('REFRESHING ACTIVITY LSIT')
    //   clearInterval(interval)
    // }
  }, [playlistTracks])
  useEffect(() => {
    getPlaylistTracks()
    // if (!hasMore) return
    // if (pageNumber != 0 && !hasMore) {
    //   return
    // }
    // setLoading(true)
    // setError(false)
    // spotifyApi
    //   .getPlaylistTracks(playlist.id, {
    //     offset: limit * pageNumber, // Offset each call by the limit * the call's index,
    //     limit: limit,
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     setPlaylistTracks((prevTracks) => {
    //       return [
    //         ...prevTracks,
    //         ...res.body.items.map((item) => {
    //           const smallestAlbumImage = chooseSmallestImage(
    //             item.track.album.images
    //           )
    //           return {
    //             artist: item.track.artists[0].name,
    //             title: item.track.name,
    //             uri: item.track.uri,
    //             albumUrl: smallestAlbumImage.url,
    //             albumName: item.track.album.name,
    //             dateAdded: item.added_at,
    //             durationMs: item.track.duration_ms,
    //           }
    //         }),
    //       ]
    //     })
    //     setHasMore(res.body.items.length < res.body.total)
    //     setLoading(false)
    //   })
    //   .catch((e) => {
    //     setError(true)
    //   })
  }, [getPlaylistTracks])
  // return { playlistTracks, hasMore, loading, error }
  return { playlistTracks, hasMore, loading: false }
}
