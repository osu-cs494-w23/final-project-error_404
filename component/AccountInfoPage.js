import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useDB from "./Hooks/useDB";
import { Container, Image } from "react-bootstrap";
import classes from "./AccountInfoPage.module.css";
import getAccount from "./Hooks/getAccount";
import getMMR from "./Hooks/getMMR";

const AccountInfoPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  let email = ""

  if(session && status === "authenticated"){
    // setEmail( session.user.email)
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
      <h1> Welcome to the Account Page</h1>

      <h2>My Login Account Info</h2>
      <h4>Username: {players.name} </h4>
      <h4>Email: {players.email}</h4>
      <h4>Gamename: {players.gamename}#{players.tagline}</h4>
      {/* <h3>Gamename: {players.gamename} | Tagline: {players.tagline}</h3> */}


      {/* Split here  */}
      <h2>My Game Info</h2>
      {playerInfo[0].account_level && 
        <div>
          <h4>Account Level: {playerInfo[0].account_level}</h4>
          <Image src={playerInfo[0].card.small}></Image>
          {/* <h4>Card: {playerInfo[0].card.small}</h4> */}
        </div>
      }
      {mmrInfo[0].currenttierpatched && 
         
        <div>
          <h4>Rank: {mmrInfo[0].currenttierpatched} | {mmrInfo[0].elo}</h4>
          <Image src={mmrInfo[0].images.small}></Image>
          {/* <h4>{mmrInfo[0].images.large}</h4> */}
        </div>
      }
    </Container>
  )
};

export default AccountInfoPage;
