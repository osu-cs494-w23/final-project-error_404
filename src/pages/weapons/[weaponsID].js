//Bootstrap Components
import Container from 'react-bootstrap/Container';
import Image  from 'react-bootstrap/Image';
//Hook and css
import useWeapons from "../../../component/Hooks/useWeapons";
//import classes from "./.module.css";

//Navigation
import {useRouter} from 'next/router'

export default function Weapon(){
    /* Ideally, it would be great if the router.query contained the uuid and we do one API call to get the information of the weapon.
    *  However, this would affect the URL. Using the name, we can get all weapons, and find the specific weapon. 
    */
    const router = useRouter()
    const [ weapons , loading , error ] = useWeapons(); //could it be possible to get the uuid from the parent page eg. /weapons? 
    // const currentWeapon = weapons.find(displayName => displayName = router.query.weaponsID)
    let currentWeapon = null
    //standard for loop to iterate through weapons array
    for(var i = 0; i < weapons.length;i++){
        if (weapons[i].displayName == router.query.weaponsID){
            currentWeapon = weapons[i]
        }
    }
    console.log("router.query:", router.query)
    console.log(currentWeapon)
    //console.log(error)

    return currentWeapon ?(
        <Container>
            <h1 style={{ color: 'white' }}> {currentWeapon.displayName}</h1>
            <Image src={currentWeapon.displayIcon}></Image>
            <h2>Shop Data</h2>
            <ul>
                <li>Category: {currentWeapon.shopData.category}</li>
                <li>Cost: {currentWeapon.shopData.cost}</li>
            </ul>

            <h2>Weapon Stats</h2>
            <ul>
                <li>Fire Rate: {currentWeapon.weaponStats.fireRate}</li>
                <li>Magazine Size: {currentWeapon.weaponStats.magazineSize}</li>
            </ul>

        </Container>
        
    ) : <h1>Error</h1>
}