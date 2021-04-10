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
  clientId = "",
  clientSecret = "",
  state = "some-state-of-my-choice";

const credentials = {
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri
};

const spotifyApi = new SpotifyWebApi(credentials);

app.post("/login", (req, res) => {
  const code = req.body.code;

  spotifyApi.authorizationCodeGrant(code).then((data) => {
    console.log(data);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(400)
  })

});

app.get("/", (req, res) => {
  res.send("response here");
});

// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
