//Bootstrap Components
import Card from 'react-bootstrap/Card'
import Image  from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

//Hook and css
import useWeapons from "./Hooks/getWeapons";
import classes from "./WeaponPage.module.css";

//Navigation 
import Link from 'next/link'
import { useRouter } from 'next/router';


const WeaponPage = () => {
    const [ weapons , loading , error ] = useWeapons();
    console.log(weapons)
    //console.log(loading)
    //console.log(error)
    const router = useRouter()
    return(
        <Container>
                <h1 className={classes.weaponHeading}>List of Valorant weapons</h1>
                {weapons.map((weapon) => (
                    <>
                    {/* <Link href={`${router.asPath}/${weapon.uuid}`}> */}
                    <Link href={`${router.asPath}/${weapon.displayName}`}>
                    <Card key={weapon.uuid} className={classes.weaponCard}>
                        <Card.Img src={weapon.displayIcon} alt="Card image" className={classes.weaponImage}/>
                        <Card.ImgOverlay  >
                            <Card.Title style={{ color: 'white' }}>{weapon.displayName}</Card.Title>
                        </Card.ImgOverlay>
                    </Card>
                    </Link> 
                    </>
                ))}
                
        </Container>
    )
  };
  
  export default WeaponPage;
  