import {useState, useEffect} from "react";
import fetch from "node-fetch";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({code}),
      headers: {"Content-Type": "application/json"},
    }).then(async res => {
      const response = await res.json()
      if (res.status !== 200) {
        console.log("Fail")
      }
      setAccessToken(response.body.access_token);
      setRefreshToken(response.body.refresh_token);
      setExpiresIn(68);
      window.history.pushState({}, null, "/")
    }).catch(err => {
      console.log("Err", err);
    })
  }, [code]);

  useEffect(
    () => {
      if (!refreshToken || !expiresIn) return
      const interval = setInterval(() => {

        fetch("http://localhost:4000/refresh", {
          method: "POST",
          body: JSON.stringify({refreshToken}),
          headers: {"Content-Type": "application/json"},
        }).then(async res => {
          const response = await res.json()

          if (res.status !== 200) {
            window.location = "/"
          }
          setAccessToken(response.body.access_token);
          setExpiresIn(response.body.expires_in);
          console.log("good")
          window.history.pushState({}, null, "/")

        }).catch(err => {
          console.log("Err", err);
          window.location = "/"
        })
      }, (expiresIn - 60) * 1000)
      return () => clearInterval(interval)
    }, [expiresIn, refreshToken])

  return accessToken
}
