import { useState, useEffect, useCallback, useMemo } from 'react'

export default function useAuth() {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const [code, setCode] = useState(null)

  const getToken = useCallback(async () => {
    if (!code) {
      return
    }
    const payload = {
      method: 'POST',
      body: JSON.stringify({ code }),
    }

    fetch('http://localhost:3000/api/auth?type=token', payload)
      .then(async (res) => {
        const response = await res.json()
        setAccessToken(response.access_token)
        setExpiresIn(response.expires_in)
        setRefreshToken(response.refresh_token)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [code])

  useEffect(() => {
    getToken()
  }, [getToken])

  useMemo(() => {
    if (typeof window === 'undefined') {
      return
    }
    const urlParamss = new URLSearchParams(window.location.search)
    if (urlParamss) {
      const paramCode = urlParamss.get('code')
      if (paramCode != code) setCode(paramCode)
    }
  }, [])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      fetch('http://localhost:3000/api/auth?type=refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })
        .then(async (res) => {
          const response = await res.json()
          console.log('RESPONSE', response)

          if (res.status !== 200) {
            // window.location = '/'
          }
          setAccessToken(response.access_token)
          setExpiresIn(response.expires_in)
          setRefreshToken(response.refresh_token)
          window.history.pushState({}, null, '/')
        })
        .catch((err) => {
          console.log('Err', err)
          // window.location = '/'
        })
    }, (expiresIn - 60) * 1000)
    return () => clearInterval(interval)
  }, [refreshToken])

  return accessToken
}
