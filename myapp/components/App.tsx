import Login from './Login'
import SpotifyWebApi from 'spotify-web-api-node'
import DashboardContainer from './Dashboard/DashboardContainer'
import useAuth from './Helpers/useAuth'

function App() {
  const accessToken = useAuth()

  return accessToken ? (
    <DashboardContainer accessToken={accessToken} />
  ) : (
    <Login />
  )
}

export default App
