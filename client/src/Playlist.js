import React from "react";
import Track from "./Track";
export default function Playlist({ playlist, tracks }) {
  console.log("HERE", playlist);
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      <img src={playlist.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{playlist.name}</div>
      </div>
      <div>
        {" "}
        Tracks
        {tracks.map((track) => {
          <Track track={track} />;
        })}
      </div>
    </div>
  );
}
