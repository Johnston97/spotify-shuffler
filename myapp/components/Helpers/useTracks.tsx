import { useEffect, useState } from 'react'

const limit = 15

export default function useTracks(
  playlist,
  accessToken,
  pageNumber,
  isShuffle
) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [chosenPlaylist, setChosenPlaylist] = useState('')
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    console.log(
      'Plaulist has changed' +
        JSON.stringify(playlist) +
        'pageNo' +
        pageNumber +
        'isShuffle' +
        isShuffle
    )
    setPlaylistTracks([])
    setChosenPlaylist(playlist.id)
    setHasMore(true)
  }, [playlist, isShuffle])

  useEffect(() => {
    if (chosenPlaylist != playlist.id) return
    if (!hasMore) return
    if (pageNumber != 0 && !hasMore) {
      return
    }

    setLoading(true)
    setError(false)

    const payload = {
      method: 'GET',
      headers: {
        accessToken,
        playlistId: playlist.id,
        totalTracks: playlist.totalTracks,
        offset: limit * pageNumber,
        limit: limit,
        isShuffle,
      },
    }

    async function fetchTracks() {
      await fetch('http://localhost:3000/api/playlistTracks', payload)
        .then(async (res) => {
          const response = await res.json()
          if (response.tracks.length > 0) {
            console.log(response.tracks)
            setPlaylistTracks([...playlistTracks, ...response.tracks])
            console.log(playlistTracks)
          }
          setHasMore(response.hasMore)
          setLoading(false)
        })
        .catch((e) => {
          console.log(e)
          setError(true)
          return
        })
    }
    fetchTracks()
  }, [pageNumber, hasMore, chosenPlaylist])
  return { playlistTracks, hasMore, loading, error }
}
