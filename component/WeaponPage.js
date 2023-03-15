import Container  from "react-bootstrap";
import useWeapons from "./Hooks/getWeapons";

const WeaponPage = () => {
    const [ weapons , loading , error ] = useWeapons();
    console.log(weapons)
    //console.log(loading)
    //console.log(error)
    return(
        <>
        <Container>
            <h1>Weapons</h1>
            <img src="https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/displayicon.png"></img>
            <h2>Name: </h2>
            <h2>Weapon Stats: </h2>

            <h3>Fire Rate: </h3>
            <h3>Magazine Size: </h3>
        </Container>
            
        </>
    )
  };
  
  export default WeaponPage;
  