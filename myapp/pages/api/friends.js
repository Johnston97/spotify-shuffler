import buddyList from 'spotify-buddylist'

export default async function handler(req, res) {
  const { accessToken } = await buddyList.getWebAccessToken(process.env.SP_DC)
  const friendActivity = await buddyList.getFriendActivity(accessToken)
  return res.status(200).json(friendActivity)
}
