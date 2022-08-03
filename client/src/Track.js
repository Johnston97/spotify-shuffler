import React from "react";

export default function Track({ track }) {
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.name}</div>
      </div>
      <div></div>
    </div>
  );
}
