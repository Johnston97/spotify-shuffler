import SpotifyWebApi from 'spotify-web-api-node'
import chooseSmallestImage from '../../components/Helpers/chooseSmallestImage'

const spotifyApi = new SpotifyWebApi()
const playlistTracks = new Map()

export default async function handler(req, res) {
  const playlistId = req.headers['playlistid']
  let hasMore = true
  let error = false

  if (req.method === 'GET') {
    const totalTracks = req.headers['totaltracks']
    const offset = req.headers['offset']
    const limit = req.headers['limit']

    if (playlistTracks.has(playlistId)) {
      const tracks = playlistTracks
        .get(playlistId)
        .slice(offset, parseInt(offset) + parseInt(limit))
      hasMore = offset < tracks
      if (tracks.length < limit) {
        hasMore = false
      }

      return res.status(200).json({ tracks, error, hasMore })
    }
    const tracksToPopulate = []

    const accessToken = req.headers['accesstoken']
    spotifyApi.setAccessToken(accessToken)

    // let limit = 100
    let numBatches = Math.floor(totalTracks / limit) + 1
    for (let batchNum = 0; batchNum <= numBatches; batchNum++) {
      // Limit can be whatever
      await spotifyApi
        .getPlaylistTracks(playlistId, { offset: batchNum * limit, limit })
        .then((res) => {
          console.log(res.body.items.length)
          res.body.items.map((item) => {
            console.log(item.track.name)
            const smallestAlbumImage = chooseSmallestImage(
              item.track.album.images
            )
            tracksToPopulate.push({
              artist: item.track.artists[0].name,
              title: item.track.name,
              uri: item.track.uri,
              albumUrl: smallestAlbumImage.url,
              albumName: item.track.album.name,
              dateAdded: item.added_at,
              durationMs: item.track.duration_ms,
            })
          })
        })
        .catch((error) => {
          console.error(error)
          error = true
        })
    }
    if (tracksToPopulate && tracksToPopulate.length > 0) {
      playlistTracks.set(playlistId, tracksToPopulate)
    }

    const tracks = playlistTracks.get(playlistId).slice(offset, limit)
    hasMore = offset < tracks.length
    if (tracks.length < limit) {
      hasMore = false
    }

    return res.status(200).json({ tracks, error, hasMore })
  }
}
