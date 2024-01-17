import React, { useEffect, useState } from "react";
// import useAuth from "./useAuth";
import { Container } from "react-bootstrap";
import chooseSmallestImage from "./helpers/chooseSmallestImage";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "./Player";
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

export default function Dashboard({ accessToken }) {
  // const accessToken = useAuth(code);
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState("");
  const [playingTrack, setPlayingTrack] = useState("");
  const [noOfPlaylists, setNoOfPlaylists] = useState("");
  function chooseTrack(track) {
    console.log(track);
    setPlayingTrack(track);
  }

  function handleReturn() {
    setPlaylist("");
  }

  function choosePlaylist(playlist) {
    setPlaylist(playlist);
    // setPlaylists([]);
    console.log("chosing plaulist", playlist);
    // window.history.pushState({}, null, `/playlist/${playlist.id}`);
  }

  function chooseShuffle(track) {
    chooseTrack(track);
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
    const getNoOfPlaylists = async () => {
      const res = await spotifyApi.getUserPlaylists({ offset: 0, limit: 1 });
      console.log("NUMBER", res.body.total);
      setNoOfPlaylists(res.body.total);
    };

    getNoOfPlaylists();
  }, [accessToken]);

  useEffect(() => {
    const limit = 20;
    const numOfBatches = Math.ceil(noOfPlaylists / limit);
    const tempPlaylists = [];

    const getPlaylists = async () => {
      for (let batchNum = 0; batchNum < numOfBatches; batchNum++) {
        await spotifyApi
          .getUserPlaylists({ offset: batchNum * limit, limit })
          .then((res) => {
            const items = res.body.items.map((playlist) => {
              const smallestPlaylistImage = chooseSmallestImage(
                playlist.images
              );
              return {
                name: playlist.name,
                id: playlist.id,
                albumUrl: smallestPlaylistImage.url,
                totalTracks: playlist.tracks.total,
              };
            });
            tempPlaylists.push(...items);
          });
      }
      setPlaylists(tempPlaylists);
    };
    getPlaylists();
  }, [noOfPlaylists]);

  const renderContent = () => {
    if (playlists === []) {
      return <div>Loading Playlists</div>;
    }
    if (playlists && playlist === "") {
      return playlists.map((playlist) => {
        return (
          <PlaylistOverview
            playlist={playlist}
            key={playlist.uri}
            choosePlaylist={choosePlaylist}
          />
        );
      });
    }
    if (playlist) {
      return (
        <Playlist
          spotifyApi={spotifyApi}
          playlist={playlist}
          key={playlist.uri}
          chooseTrack={chooseTrack}
          chooseShuffle={chooseShuffle}
        />
      );
    }
  };

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
      <div
        className="d-flex m-2 align-items-center"
        style={{ cursor: "pointer" }}
        onClick={handleReturn}
      >
        return to playlists
      </div>
      <div className="">
        <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
        <div>{renderContent()}</div>
      </div>
    </Container>
  );
}
