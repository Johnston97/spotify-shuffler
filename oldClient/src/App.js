import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const redirectUri = "http://localhost:3000";
const clientId = "436ac09d658f4723a59c3c3b9f0bf5ee";
const clientSecret = "0389ea2bd3994324ae91d21844cb5d8b";

const credentials = {
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
};

const spotifyApi = new SpotifyWebApi(credentials);

function App() {
  const accessToken = useAuth(spotifyApi);

  return accessToken ? <Dashboard accessToken={accessToken} /> : <Login />;
}

export default App;
