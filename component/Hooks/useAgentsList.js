import { useEffect, useState } from 'react'

function useAgentsList(){
    const [ agents, setAgents ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchAgentsData() {
            setLoading(true)
            let responseBody = {}
            try {
                const response = await fetch(
                    `https://valorant-api.com/v1/agents`,
                    {signal: controller.signal}  
                )
                // console.log(response.status)
                if(response.status !== 200){
                    console.log("== status:",response.status)
                    setError(true)
                    setLoading(false)
                    ignore = true
                } else {
                    responseBody = await response.json()
                    setError(false)
                    // console.log(responseBody)
                }
            } catch(e){
                if (e instanceof DOMException) {
                    console.log("HTTP request cancelled")
                } else {
                    setError(true)
                    console.error("Error:", e)
                    throw e
                }
            }

            if(!ignore){
                setAgents(responseBody || "")
                setLoading(false)
            }
        }
        
        fetchAgentsData()

        return () => {
            ignore = true
            controller.abort()
        }

    }, [])

    return [ agents , loading , error]
}

export default useAgentsList