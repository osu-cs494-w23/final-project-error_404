import {useEffect,useState} from 'react'

function useAccount(username,tagline){
    const [ info, setInfo ] = useState("")//store json
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    useEffect( () =>{
        let ignore = false
        const controller = new AbortController()

        async function fetchAccount(){
            setLoading(true)
            let responseBody = {}
            try{
                const response = await fetch(
                    `https://api.henrikdev.xyz/valorant/v1/account/${username}/${tagline}`,
                    {signal: controller.signal }
                    )
                if(response.status !== 200){
                    console.log("error:" , response.status)
                    setError(true)
                    
                }else{
                    setError(false)
                    console.log("Success")
                    responseBody = await response.json()
                }
                
            }catch (e){
                if(e instanceof DOMException){
                    console.log("HTTP Request cancelled")
                }
                else{
                    setError(true)
                    console.error("Error", e)
                    throw e
                }
            }
            if(!ignore){
                setInfo(responseBody.data || "")
                setLoading(false)
                //setError(false)
            }

        }
        fetchAccount()
        console.log("Fetched Account")

        return () => {
            ignore = true 
            controller.abort()
        }
    }, [username, tagline]) 
    return [info, loading, error]
    
}

export default useAccount