import {useEffect, useState} from 'react'

function getWeapons(){
    const [weapons, setWeapons] = useState([]) //store in array
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    //console.log("weapons: ", weapons)
    useEffect( () =>{
        let ignore = false
        const controller = new AbortController()

        async function fetchWeapons(){
            setLoading(true)
            let responseBody = {}
            try{
                const response = await fetch(
                    "https://valorant-api.com/v1/weapons",
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
                setWeapons(responseBody.data || [])
                setLoading(false)
                //setError(false)
            }

        }
        fetchWeapons()
        console.log("Fetched weapons")

        return () => {
            ignore = true 
            controller.abort()
        }
    }, []) 
    return [weapons, loading, error]
}
export default getWeapons