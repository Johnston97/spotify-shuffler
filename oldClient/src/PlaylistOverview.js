import React from "react";

export default function PlaylistOverview({ playlist, choosePlaylist }) {
  function handleSelection() {
    choosePlaylist(playlist);
  }
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handleSelection}
    >
      <img src={playlist.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{playlist.name}</div>
      </div>
    </div>
  );
}
