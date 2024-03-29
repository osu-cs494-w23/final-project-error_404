//Bootstrap Components
import Container from 'react-bootstrap/Container';
import Image  from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
//Hook and css
import useWeapons from "../../../component/Hooks/useWeapons";
import classes from "./Weapon.module.css";
import {useState , useEffect} from 'react';

//Navigation
import {useRouter} from 'next/router'
import { Button } from 'react-bootstrap';

export default function Weapon(){
    /* Ideally, it would be great if the router.query contained the uuid and we do one API call to get the information of the weapon.
    *  However, this would affect the URL. Using the name, we can get all weapons, and find the specific weapon. 
    */
    const router = useRouter()
    const [index, setIndex] = useState(0)
    const [ weapons , loading , error ] = useWeapons(); //could it be possible to get the uuid from the parent page eg. /weapons? 

    let currentWeapon = null
    //standard for loop to iterate through weapons array
    for(var i = 0; i < weapons.length;i++){
        if (weapons[i].displayName == router.query.weaponsID){
            currentWeapon = weapons[i]
        }
    }

    let currentSkins = null
    //Let's take out any skins that would not display properly
    if(currentWeapon != null){
        currentSkins = currentWeapon.skins
        for(var i = 0; i < currentSkins.length; i++){
            //these are conditions for removal
            if(currentSkins[i].displayIcon == null || currentSkins[i].displayName == "Random Favorite Skin" || currentSkins[i].displayName == `Standard ${currentWeapon.displayName}`){
                //console.log("Removed")
                currentSkins.splice(i, 1)
            }
        }
    }

    const incrementIndex = () => {
        if(index != currentSkins.length-1){
            setIndex(index +1);
        }
        //console.log("New index:", index)
    };
    const decrementIndex = () => {
        if(index != 0){
            setIndex(index - 1);
        }
        //console.log("New index:", index)
    };

    //console.log("router.query:", router.query)
    //console.log(currentWeapon)
    //console.log(error)
    
    // Special case: if currentWeapon's displayName is Knife, 
    //then it will have a different page since many fields such as shop data will be null. 
    if(currentWeapon != null && currentWeapon.displayName === "Melee"){
        console.log(currentWeapon)
        const meleeSkins = currentWeapon.skins
        {meleeSkins.map(i => {
            console.log(i)
            console.log(i.displayIcon)
        })}
        return(
            <Container className={classes.container}>
                <div className={classes.weaponDiv}>
                    <h1 > {currentWeapon.displayName}</h1>
                    <Image src={currentWeapon.displayIcon} className={classes.weaponImage}></Image>

                    <div className="skinsDiv">
                    <h2>Skins</h2>
                    {/* <Carousel>
                        {meleeSkins.map(i => {
                            return(
                            <>
                            <Carousel.Item>
                                <img src={i.displayIcon}></img>
                            </Carousel.Item>
                            </>
                            )
                            
                        })}
                    </Carousel> */}

                    <ul className={classes.listItems}>
                    <li>{currentWeapon.skins[index].displayName}<Image src={currentWeapon.skins[index].displayIcon} className={classes.skinImage}></Image> </li>
                        <li>{index + 1}/{currentSkins.length}</li>
                        <button onClick={decrementIndex} className={classes.arrowButton}>&#10094;</button>
                        <button onClick={incrementIndex} className={classes.arrowButton}>&#10095;</button>
                    </ul>
                    </div>
                    
                </div>
            </Container>
        )
    }
    return currentWeapon ? (
        <Container className={classes.container}>

            <div className={classes.weaponDiv}>
                <h1> {currentWeapon.displayName}</h1>
                <Image src={currentWeapon.displayIcon} className={classes.weaponImage}></Image>

                <Container className={classes.infoDiv}>
                    <div className='shopDiv'>
                        <h2>Shop Data</h2>
                        <ul className={classes.listItems}>
                            <li>Category: <b> {currentWeapon.shopData.category} </b></li>
                            <li>Cost: <b>{currentWeapon.shopData.cost}</b></li>
                        </ul>
                    </div>

                    <div className='statsDiv'>
                        <h2>Weapon Stats</h2>
                        <ul className={classes.listItems}>
                            <li>Fire Rate: <b>{currentWeapon.weaponStats.fireRate}</b> </li>
                            <li>Magazine Size: <b>{currentWeapon.weaponStats.magazineSize}</b></li>
                            <li>Reload Time: <b>{currentWeapon.weaponStats.reloadTimeSeconds} seconds</b> </li>
                        </ul>
                    </div>

                    <div className='damageDiv'>
                        <h2>Damage Stats</h2>
                        <ul className={classes.listItems}>
                            <li>Head: <b>{currentWeapon.weaponStats.damageRanges[0].headDamage}hp </b> </li>
                            <li>Body: <b>{currentWeapon.weaponStats.damageRanges[0].bodyDamage}hp </b></li>
                            <li>Leg: <b>{currentWeapon.weaponStats.damageRanges[0].legDamage.toFixed(2)} hp </b></li>
                        </ul>
                    </div>
                </Container>
            </div>

            <div className="skinsDiv">
                <h2>Skins</h2>
                <div className={classes.skinItems}>
                    <button onClick={decrementIndex} className={classes.arrowButton}>&#10094;</button> 
                    <div className='d-flex flex-column gap-10 justify-content-center text-center m-4'>
                        {index + 1}/{currentSkins.length}
                        <div className={classes.skinImageDiv}>
                            <Image src={currentWeapon.skins[index].displayIcon} className={classes.skinImage}>
                            </Image>
                        </div>
                        
                        {currentWeapon.skins[index].displayName} 
                    </div>
                    <button onClick={incrementIndex} className={classes.arrowButton}>&#10095;</button>
                </div>
            </div>
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