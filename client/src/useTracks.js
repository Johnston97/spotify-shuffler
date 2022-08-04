import { useState } from "react";
import chooseSmallestImage from "./helpers/chooseSmallestImage";

// const limit = 100;

export default function useTracks(spotifyApi, playlist) {
  const [playlistTracks, setPlaylistTracks] = useState([]);

  console.log("getting tracks", playlist);
  spotifyApi.getPlaylistTracks(playlist.id).then((res) => {
    setPlaylistTracks(
      res.body.items.map((item) => {
        const smallestAlbumImage = chooseSmallestImage(item.track.album.images);

        return {
          artist: item.track.artists[0],
          title: item.track.name,
          uri: item.track.uri,
          albumUrl: smallestAlbumImage.url,
        };
      })
    );
  });
  return playlistTracks;
}
