import { useState, useEffect } from 'react'

function useLeaderboard(region) {
    const [ players, setPlayers ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchPlayers() {
            setLoading(true)
            let responseBody = {}
            try {
                const response = await fetch(
                    'https://api.henrikdev.xyz/valorant/v1/leaderboard/' + region,
                    { signal: controller.signal }
                )
                if (response.status !== 200) {
                    setError(true)
                } else {
                    setError(false)
                    responseBody = await response.json()
                }
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log('HTTP request aborted')
                } else {
                    setError(true)
                    console.error("Error:", e)
                    throw e
                }
            }

            if (!ignore) {
                setPlayers(responseBody || [])
                setLoading(false)
            }
        }
        if (region) {
            fetchPlayers()
        }
        return () => {
            controller.abort()
            ignore = true
        }
    }, [ region ])
    
    return [ players, loading, error ]
}

export default useLeaderboard