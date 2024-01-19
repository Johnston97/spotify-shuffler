import { useEffect, useState } from 'react'
import chooseSmallestImage from './chooseSmallestImage'

const limit = 15

export default function useTracks(spotifyApi, playlist, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setPlaylistTracks([])
    setHasMore(true)
  }, [playlist])

  useEffect(() => {
    if (!hasMore) return
    if (pageNumber != 0 && !hasMore) {
      return
    }
    setLoading(true)
    setError(false)
    spotifyApi
      .getPlaylistTracks(playlist.id, {
        offset: limit * pageNumber, // Offset each call by the limit * the call's index,
        limit: limit,
      })
      .then((res) => {
        setPlaylistTracks((prevTracks) => {
          return [
            ...prevTracks,
            ...res.body.items.map((item) => {
              const smallestAlbumImage = chooseSmallestImage(
                item.track.album.images
              )
              return {
                artist: item.track.artists[0].name,
                title: item.track.name,
                uri: item.track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            }),
          ]
        })
        setHasMore(res.body.items.length < res.body.total)
        setLoading(false)
      })
      .catch((e) => {
        setError(true)
      })
  }, [pageNumber, hasMore, playlist])
  return { playlistTracks, hasMore, loading, error }
}
