import Image  from 'react-bootstrap/Image';
import classes from "./WeaponPage.module.css";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import useWeapons from "./Hooks/getWeapons";

const WeaponPage = () => {
    const [ weapons , loading , error ] = useWeapons();
    console.log(weapons)
    //console.log(loading)
    //console.log(error)
    return(
        <Container>
                <h1>List of Valorant weapons</h1>
                {weapons.map((weapon) => (
                    <>
                    <Card key={weapon.uuid} className={classes.weaponCard}>
                        <Card.Img src={weapon.displayIcon} alt="Card image" />
                        <Card.ImgOverlay >
                            <Card.Title style={{ color: 'white' }}>{weapon.displayName}</Card.Title>
                        </Card.ImgOverlay>
                    </Card>
                    </>
                ))}
                
        </Container>
    )
  };
  
  export default WeaponPage;
  