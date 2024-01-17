import { useEffect, useState } from 'react'
import chooseSmallestImage from '../Helpers/chooseSmallestImage'

export default function usePlaylists({ spotifyApi }) {
  const [noOfPlaylists, setNoOfPlaylists] = useState(0)
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    if (!spotifyApi.getCredentials().accessToken) return
    const getNoOfPlaylists = async () => {
      const res = await spotifyApi.getUserPlaylists({
        offset: 0,
        limit: 1,
      })
      setNoOfPlaylists(res.body.total)
    }

    getNoOfPlaylists()
  }, [spotifyApi])

  useEffect(() => {
    const limit = 20
    const numOfBatches = Math.ceil(noOfPlaylists / limit)
    const tempPlaylists = []

    const getPlaylists = async () => {
      for (let batchNum = 0; batchNum < numOfBatches; batchNum++) {
        await spotifyApi
          .getUserPlaylists({ offset: batchNum * limit, limit })
          .then((res) => {
            const items = res.body.items.map((playlist) => {
              const smallestPlaylistImage = chooseSmallestImage(playlist.images)
              return {
                name: playlist.name,
                id: playlist.id,
                albumUrl: smallestPlaylistImage.url,
                totalTracks: playlist.tracks.total,
                uri: playlist.uri,
              }
            })
            tempPlaylists.push(...items)
          })
      }
      setPlaylists(tempPlaylists)
    }
    getPlaylists()
  }, [noOfPlaylists, spotifyApi])

  return playlists
}
