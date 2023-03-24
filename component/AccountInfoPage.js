import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useDB from "./Hooks/useDB";
import { Container, Image, Card } from "react-bootstrap";
import classes from "./AccountInfoPage.module.css";
import getAccount from "./Hooks/useAccount";
import getMMR from "./Hooks/useMMR";

const AccountInfoPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  let email = ""

  if(session && status === "authenticated"){
    //  setEmail( session.user.email)
    email = session.user.email
    
  }
  // Hooks that grab data--------------------
  const [ players , loading , error ] = useDB(email)
  let playerInfo = null
  let mmrInfo = null
  if(players){
    playerInfo = getAccount(players.gamename, players.tagline)
    mmrInfo = getMMR(players.gamename, players.tagline)
  }
  //console.log("Players is: ", players)
  console.log("Playerinfo is: ", playerInfo)
  console.log("mmrInfo is: ", mmrInfo)
  //-------------------------------------------

  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  if (status === `unauthenticated`) {
    router.push(`/`);
  }
  
  return (

    <Container className={classes.container}>
      
      <Card style={{ width: "18rem"}}>
        <Card.Header><b>My Login Account Info</b></Card.Header>
        <Card.Body>
          <Card.Text><b>Username:</b> {players.name}</Card.Text>
          <Card.Text><b>Email:</b> {players.email}</Card.Text>
          <Card.Text><b>Gamename:</b> {players.gamename ? `${players.gamename}#${players.tagline}` : "No game info"}</Card.Text>
        </Card.Body>
      </Card>
      
      {playerInfo[0].account_level && 
        <Card bg="light" key="light" text="dark" className={classes.playerCard}>
          <Card.Title><b>Account Level:</b> {playerInfo[0].account_level}</Card.Title>
          <Card.Img src={playerInfo[0].card.small}></Card.Img>

        </Card>

      }
      {mmrInfo[0].currenttierpatched && 
        <Card bg="light" key="light" text="dark" className={classes.rankCard}>
        
          <Card.Body className={classes.rankDetail}>
            <div>
              <Card.Title><b>My Game Rank</b></Card.Title>
              <Card.Text><b>Rank:</b> {mmrInfo[0].currenttierpatched} </Card.Text>
              <Card.Text><b>MMR:</b> {mmrInfo[0].elo}</Card.Text>
            </div>
            <Card.Img src={mmrInfo[0].images.large}></Card.Img>
          </Card.Body>
          

        </Card>
      }
    </Container>
  )
};

export default AccountInfoPage;
