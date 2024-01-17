import { useEffect, useState } from "react";

export default function useTrack(spotifyApi, playlist, shuffleNo) {
  const [track, setTrack] = useState("");

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  useEffect(() => {
    console.log("useTrack", spotifyApi, playlist, playlist.totalTracks);

    const random = getRandomInt(0, playlist.totalTracks);
    console.log("ran", random);
    spotifyApi
      .getPlaylistTracks(playlist.id, {
        offset: random, // Offset each call by the limit * the call's index,
        limit: 1,
      })
      .then((res) => {
        console.log(res);
        const track = res.body.items[0].track;
        setTrack({
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
        });
      });
  }, [shuffleNo]);
  return track;
}
