//Bootstrap Components
import Container from 'react-bootstrap/Container';
import Image  from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
//Hook and css
import useWeapons from "../../../component/Hooks/useWeapons";
import classes from "./Weapon.module.css";

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

    // Special case: if currentWeapon's displayName is Knife, 
    //then it will have a different page since many fields such as shop data will be null. 
    if(currentWeapon != null && currentWeapon.displayName === "Melee"){
        return(
            <Container className={classes.container}>
                <h1 > {currentWeapon.displayName}</h1>
            </Container>
        )
    }
    return currentWeapon ? (
        <Container className={classes.container}>
            {/* <div className=''> */}
                <h1> {currentWeapon.displayName}</h1>
                <Image src={currentWeapon.displayIcon} className={classes.weaponImage}></Image>

                <Container className={classes.infoDiv}>
                    <div className='shopDiv'>
                        <h2>Shop Data</h2>
                        <ul className={classes.listItems}>
                            <li>Category: {currentWeapon.shopData.category}</li>
                            <li>Cost: {currentWeapon.shopData.cost}</li>
                        </ul>
                    </div>

                    <div className='statsDiv'>
                        <h2>Weapon Stats</h2>
                        <ul className={classes.listItems}>
                            <li>Fire Rate: {currentWeapon.weaponStats.fireRate}</li>
                            <li>Magazine Size: {currentWeapon.weaponStats.magazineSize}</li>
                            <li>Reload Time: {currentWeapon.weaponStats.reloadTimeSeconds} seconds</li>
                        </ul>
                    </div>

                    <div className='damageDiv'>
                        <h2>Damage Stats</h2>
                        <ul>

                        </ul>
                    </div>
                </Container>

            {/* </div> */}
            
        </Container>
        
    ) : (
        <Container>
            {error && <Container><h1>Error with fetching weapon data</h1></Container>}
            {loading &&
                <Spinner animation="border" role="status" style={{ width: "18rem", height: "18rem" }}>
                    <span className="visually-hidden"></span>
                </Spinner> 
            }
        </Container>
    )
}