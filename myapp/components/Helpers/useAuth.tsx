import { useState, useEffect } from 'react'

// const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
//   "%20"
// )}&response_type=token&show_dialog=true`;

export default function useAuth() {
  const [accessToken, setAccessToken] = useState()
  // const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState()

  // useEffect(() => {
  //   fetch("http://localhost:4000/login", {
  //     method: "POST",
  //     body: JSON.stringify({ code }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then(async (res) => {
  //       const response = await res.json();
  //       if (res.status !== 200) {
  //         console.log("Fail");
  //       }
  //       console.log("success token");
  //       setAccessToken(response.body.access_token);
  //       setRefreshToken(response.body.refresh_token);
  //       setExpiresIn(600);
  //       window.history.pushState({}, null, "/");
  //     })
  //     .catch((err) => {
  //       console.log("Err", err);
  //     });
  // }, [code]);

  useEffect(() => {
    const responseUriParts = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        let parts = item.split('=')
        initial[parts[0]] = decodeURIComponent(parts[1])
        return initial
      }, {})
    if (responseUriParts.access_token) {
      console.log('token')
      console.log(responseUriParts)
      setAccessToken(responseUriParts.access_token)
      setExpiresIn(responseUriParts.expires_in)
      window.history.pushState({}, null, '/playlists')
    }
  }, [])

  // useEffect(() => {
  //   // spotifyApi.refreshAccessToken().then((res) => {
  //   //   console.log(res);
  //   // });
  //   console.log('refresh')
  // }, [expiresIn])

  // useEffect(() => {
  //   if (!refreshToken || !expiresIn) return;
  //   const interval = setInterval(() => {
  //     fetch("http://localhost:4000/refresh", {
  //       method: "POST",
  //       body: JSON.stringify({ refreshToken }),
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then(async (res) => {
  //         const response = await res.json();

  //         if (res.status !== 200) {
  //           window.location = "/";
  //         }
  //         setAccessToken(response.body.access_token);
  //         setExpiresIn(response.body.expires_in);
  //         console.log("refresh token set");
  //         window.history.pushState({}, null, "/");
  //       })
  //       .catch((err) => {
  //         console.log("Err", err);
  //         window.location = "/";
  //       });
  //   }, (expiresIn - 60) * 1000);
  //   return () => clearInterval(interval);
  // }, [expiresIn, refreshToken]);

  return accessToken
}
