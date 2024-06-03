import SpotifyWebApi from 'spotify-web-api-node'
import chooseSmallestImage from '../../components/Helpers/chooseSmallestImage'

const spotifyApi = new SpotifyWebApi()

export default async function handler(req, res) {
  const tracks = []
  if (req.method === 'GET') {
    const accessToken = req.headers['accesstoken']
    spotifyApi.setAccessToken(accessToken)

    const playlistId = req.headers['playlistid']
    const totalTracks = req.headers['totaltracks']

    let limit = 100
    let numBatches = Math.floor(totalTracks / limit) + 1

    for (let batchNum = 0; batchNum <= numBatches; batchNum++) {
      await spotifyApi
        .getPlaylistTracks(playlistId, { offset: batchNum * limit })
        .then((res) => {
          res.body.items.map((item) => {
            const smallestAlbumImage = chooseSmallestImage(
              item.track.album.images
            )
            tracks.push({
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
    }
    console.log(tracks)

    return res.status(200).json(tracks)
  }
}
