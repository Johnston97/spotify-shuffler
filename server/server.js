const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;
const SpotifyWebApi = require("spotify-web-api-node");

const scopes = [
  "streaming",
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
],
  redirectUri = "http://localhost:3000",
  clientId = "436ac09d658f4723a59c3c3b9f0bf5ee",
  clientSecret = "0389ea2bd3994324ae91d21844cb5d8b",
  state = "some-state-of-my-choice";

const credentials = {
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri
};


app.post("/login", (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi(credentials);

  spotifyApi.authorizationCodeGrant(code).then((data) => {
    res.send(data)
  }).catch((err) => {
    console.log(err);
    res.sendStatus(400)
  })

});

app.get("/", (req, res) => {
  res.send("response here");
});


app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({...credentials, refreshToken});

  spotifyApi.refreshAccessToken().then((response) => {
    res.send(response)
  }).catch((err) => {
    console.log(err);
    res.sendStatus(400)
  });
})

// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
