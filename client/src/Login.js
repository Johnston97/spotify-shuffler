import React from "react";
import {Container} from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=436ac09d658f4723a59c3c3b9f0bf5ee&response_type=code&redirect_uri=http://localhost:3000";

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{minHeight: "100vh"}}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
}
