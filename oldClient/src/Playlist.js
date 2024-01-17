import React, { useState, useCallback, useRef } from "react";
import useTracks from "./useTracks";
import useTrack from "./useTrack";
import Track from "./Track";

export default function Playlist({
  spotifyApi,
  playlist,
  chooseTrack,
  chooseShuffle,
}) {
  const [pageNumber, setPageNumber] = useState(0);
  const [shuffleNo, setShuffleNo] = useState(0);
  const { playlistTracks, hasMore, loading } = useTracks(
    spotifyApi,
    playlist,
    pageNumber
  );
  const track = useTrack(spotifyApi, playlist, shuffleNo);

  function handleShuffle() {
    setShuffleNo(shuffleNo + 1);
    chooseShuffle(track);
  }

  const observer = useRef();
  const lastTrackElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visible");
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <div
        className="d-flex m-2 align-items-center"
        style={{ cursor: "pointer" }}
      >
        <img src={playlist.albumUrl} />
        <div className="h2 ml-3">
          <div>{playlist.name}</div>
        </div>
      </div>
      <div
        className="d-flex m-2 align-items-center"
        style={{ cursor: "pointer" }}
        onClick={handleShuffle}
      >
        Shuffle
      </div>
      <div>
        {playlistTracks.map((track, index) => {
          if (playlistTracks.length === index + 1)
            return (
              <div ref={lastTrackElementRef}>
                <Track track={track} chooseTrack={chooseTrack} />
              </div>
            );
          else {
            return (
              <div>
                <Track track={track} chooseTrack={chooseTrack} />
              </div>
            );
          }
        })}
        <div>{loading && "loading..."} </div>
      </div>
    </div>
  );
}
