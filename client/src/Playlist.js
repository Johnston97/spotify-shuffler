import React from "react";
import useTracks from "./useTracks";
import Track from "./Track";

export default function Playlist({ spotifyApi, playlist }) {
  const playlistTracks = useTracks(spotifyApi, playlist);

  return (
    <div>
      <div
        className="d-flex m-2 align-items-center"
        style={{ cursor: "pointer" }}
      >
        <img
          src={playlist.albumUrl}
          style={{ height: "64px", width: "64px" }}
        />
        <div className="ml-3">
          <div>{playlist.name}</div>
        </div>
      </div>
      <div>
        {playlistTracks.map((track) => {
          return <Track track={track} />;
        })}
      </div>
    </div>
  );
}
