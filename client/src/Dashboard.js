import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import PlaylistOverview from "./PlaylistOverview";
import Playlist from "./Playlist";

const redirectUri = "http://localhost:3000",
  clientId = "436ac09d658f4723a59c3c3b9f0bf5ee",
  clientSecret = "0389ea2bd3994324ae91d21844cb5d8b",
  state = "some-state-of-my-choice";

const credentials = {
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
};

const spotifyApi = new SpotifyWebApi(credentials);

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState("");
  const [playingTrack, setPlayingTrack] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  function choosePlaylist(playlist) {
    setPlaylist(playlist);
    setPlaylists([]);
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      console.log(res.body);
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getUserPlaylists().then((res) => {
      setPlaylists(
        res.body.items.map((playlist) => {
          const smallestPlaylistImage = playlist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            playlist.images[0]
          );
          console.log(playlist);
          return {
            name: playlist.name,
            id: playlist.id,
            albumUrl: smallestPlaylistImage.url,
          };
        })
      );
    });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    if (!playlist) return;
    if (playlist.tracks > playlist.tracks.limit) {
      // Divide the total number of track by the limit to get the number of API calls
      for (
        let i = 1;
        i < Math.ceil(playlist.tracks.total / playlist.tracks.limit);
        i++
      ) {
        const trackToAdd = spotifyApi.getPlaylistTracks(playlist.id, {
          offset: playlist.tracks.limit * i, // Offset each call by the limit * the call's index
        }).body;

        // Push the retreived tracks into the array
        trackToAdd.items.forEach((item) => playlist.tracks.items.push(item));
        setPlaylistTracks(playlist.tracks);
      }
    }
  }, [accessToken, playlist]);

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
            playlist={playlist}
            key={playlist.uri}
            tracks={playlistTracks}
          />
        )}
      </div>
    </Container>
  );
}
