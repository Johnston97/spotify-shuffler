import { useEffect, useState } from 'react'
import chooseSmallestImage from '../Helpers/chooseSmallestImage'

export default function usePlaylists({ spotifyApi }) {
  const [noOfPlaylists, setNoOfPlaylists] = useState(0)
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    if (!spotifyApi.getCredentials().accessToken) return
    console.log(spotifyApi.getCredentials().accessToken)
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
            // Error handling if null
            const items = res.body.items.map((playlist) => {
              const smallestPlaylistImage = chooseSmallestImage(playlist.images)
              // 1st object may not be largest
              return {
                name: playlist.name,
                id: playlist.id,
                albumUrl: smallestPlaylistImage.url,
                largeAlbumUrl: playlist.images[0].url,
                totalTracks: playlist.tracks.total,
                uri: playlist.uri,
                owner: playlist.owner,
              }
            })
            tempPlaylists.push(...items)
          })
      }
      console.log(tempPlaylists)
      setPlaylists(tempPlaylists)
    }
    getPlaylists()
  }, [noOfPlaylists, spotifyApi])

  return playlists
}
