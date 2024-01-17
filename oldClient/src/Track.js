import React from "react";

export default function Track({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div className="h5">{track.title}</div>
        <div className="">{track.artist}</div>
      </div>
      <div></div>
    </div>
  );
}
