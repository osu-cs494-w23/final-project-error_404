import {useEffect, useState} from 'react'
function useDB(email){
    const [ players, setPlayers ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)


    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchIngame(){
            setLoading(true)
          let responseBody = {}
          try{
            console.log("in try statement", email)
            const response = await fetch("api/user/ingame", { 
              method: "POST",
              body: JSON.stringify({ email}),
              headers: {
                "Content-Type": "application/json",
              },
              signal: controller.signal}
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
    if(email){
        fetchIngame()
    }
    return () => {
        controller.abort()
        ignore = true
    }     
    }, [email])
    return [players, loading, error]
}
export default useDB