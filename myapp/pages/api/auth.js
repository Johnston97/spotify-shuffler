// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import crypto from 'crypto'
import url from 'url'
const scope =
  'streaming user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state'

const authUrl = new URL(process.env.AUTH_URL)
const tokenUrl = new URL(process.env.TOKEN_URL)

function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

function generateCodeVerifier() {
  var array = new Uint32Array(56 / 2)
  crypto.getRandomValues(array)
  return Array.from(array, dec2hex).join('')
}

function sha256(plain) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return crypto.subtle.digest('SHA-256', data)
}

function base64urlencode(a) {
  var str = ''
  var bytes = new Uint8Array(a)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i])
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function generateCodeChallengeFromVerifier(v) {
  var hashed = await sha256(v)
  var base64encoded = base64urlencode(hashed)
  return base64encoded
}
const codeVerifier = generateCodeVerifier()
let codeChallenge

export default async function handler(req, res) {
  if (!codeChallenge) {
    codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier)
  }
  var queryData = url.parse(req.url, true).query

  if (req.method === 'GET') {
    // Construct auth url
    const params = {
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: process.env.REDIRECT_URI,
    }
    authUrl.search = new URLSearchParams(params).toString()

    return res.status(200).json(authUrl)
  } else {
    if (queryData.type === 'token') {
      const reqBody = JSON.parse(req.body)

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID,
          grant_type: 'authorization_code',
          code: reqBody.code,
          redirect_uri: process.env.REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      }

      await fetch(tokenUrl, payload)
        .then(async (response) => {
          const content = await response.json()
          return res.status(200).json(content)
        })
        .catch((e) => {
          console.log('ERROR' + e)
          return res.status(400)
        })
    }
    if (queryData.type === 'refresh') {
      const reqBody = JSON.parse(req.body)

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID,
          grant_type: 'refresh_token',
          refresh_token: reqBody.refreshToken,
        }),
      }

      await fetch(tokenUrl, payload)
        .then(async (response) => {
          const content = await response.json()
          console.log(content)
          return res.status(200).json(content)
        })
        .catch((e) => {
          console.log('ERROR' + e)
          return res.status(400)
        })
    }
  }
}
