import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { Container } from "react-bootstrap";
import chooseSmallestImage from "./helpers/chooseSmallestImage";
import SpotifyWebApi from "spotify-web-api-node";
import Playlist from "./Playlist";
import PlaylistOverview from "./PlaylistOverview";
require("dotenv").config();

const redirectUri = process.env.REDIRECT_URI,
  clientId = process.env.CLIENT_ID,
  clientSecret = process.env.CLIENT_SECRET;

const credentials = {
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
};

const spotifyApi = new SpotifyWebApi(credentials);

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState("");
  // const [playingTrack, setPlayingTrack] = useState("");
  // const [playlistTracks, setPlaylistTracks] = useState([]);
  // function chooseTrack(track) {
  //   setPlayingTrack(track);
  //   setSearch("");
  // }

  function choosePlaylist(playlist) {
    console.log("CHosing");
    setPlaylist(playlist);
    setPlaylists([]);
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // useEffect(() => {
  //   if (!search) return setSearchResults([]);
  //   if (!accessToken) return;

  //   let cancel = false;

  //   spotifyApi.searchTracks(search).then((res) => {
  //     if (cancel) return;
  //     console.log(res.body);
  //     setSearchResults(
  //       res.body.tracks.items.map((track) => {
  //         const smallestAlbumImage = chooseSmallestImage(track.album.images);

  //         return {
  //           artist: track.artists[0].name,
  //           title: track.name,
  //           uri: track.uri,
  //           albumUrl: smallestAlbumImage.url,
  //         };
  //       })
  //     );
  //   });
  //   return () => (cancel = true);
  // }, [search]);

  useEffect(() => {
    if (!accessToken) return;
    if (playlist) return;
    spotifyApi.getUserPlaylists().then((res) => {
      setPlaylists(
        res.body.items.map((playlist) => {
          const smallestPlaylistImage = chooseSmallestImage(playlist.images);

          return {
            name: playlist.name,
            id: playlist.id,
            albumUrl: smallestPlaylistImage.url,
            totalTracks: playlist.tracks.total,
          };
        })
      );
    });
  }, [accessToken]);

  // useEffect(() => {
  //   if (!accessToken) return;
  //   if (!playlist) return;
  //   // if (playlist.tracks > limit) {
  //   //   // Divide the total number of track by the limit to get the number of API calls
  //   //   for (let i = 1; i < Math.ceil(playlist.tracks.total / limit); i++) {
  //   //     const trackToAdd = spotifyApi.getPlaylistTracks(playlist.id, {
  //   //       offset: limit * i, // Offset each call by the limit * the call's index
  //   //     }).body;

  //   //     // Push the retreived tracks into the array
  //   //     trackToAdd.items.forEach((item) => playlist.tracks.items.push(item));
  //   //     setPlaylistTracks(playlist.tracks);
  //   //   }
  //   // } else {
  //   spotifyApi.getPlaylistTracks(playlist.id).then((res) => {
  //     setPlaylistTracks(
  //       res.body.items.map((item) => {
  //         const smallestAlbumImage = chooseSmallestImage(
  //           item.track.album.images
  //         );

  //         return {
  //           artist: item.track.artists[0],
  //           title: item.track.name,
  //           uri: item.track.uri,
  //           albumUrl: smallestAlbumImage.url,
  //         };
  //       })
  //     );
  //   });
  // }, [playlist]);

  return (
    // <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
    //   <Form.Control
    //     type="search"
    //     placeholder="Search Songs"
    //     value={search}
    //     onChange={(e) => setSearch(e.target.value)}
    //   />
    //   <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
    //     {console.log("res", searchResults)}
    //     {searchResults.map((track) => {
    //       return (
    //         <TrackSearchResult
    //           track={track}
    //           key={track.uri}
    //           chooseTrack={chooseTrack}
    //         />
    //       );
    //     })}
    //   </div>
    //   <div>
    //     <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    //   </div>
    // </Container>
    <Container className="">
      <div className="">
        {!playlist ? (
          playlists.map((playlist) => {
            return (
              <PlaylistOverview
                playlist={playlist}
                key={playlist.uri}
                choosePlaylist={choosePlaylist}
              />
            );
          })
        ) : (
          <Playlist
            spotifyApi={spotifyApi}
            playlist={playlist}
            key={playlist.uri}
          />
        )}
      </div>
    </Container>
  );
}
