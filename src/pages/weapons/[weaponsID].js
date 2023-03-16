import {useRouter} from 'next/router'


export default function Weapon(){
    const router = useRouter()
    console.log("router.query:", router.query)
    //How to get weapons array from WeaponsPage? Use the useWeapons hook?
    //const weapon = weapons[router.query.weaponsID]
    return(
        <h1>Selected weapon: </h1>
    )
}