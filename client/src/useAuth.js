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
    }).then((res) => {
      console.log(res.json());
      if (res.status !== 200) {
        window.location = "/"
      }
    }).catch((err) => {
      window.location = "/"
    })
  }, [code]);
}
