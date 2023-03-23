import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useDB from "./Hooks/useDB";
import { Container } from "react-bootstrap";
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
  console.log("Players is: ", players)
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

      <h3>Username: {players.name} </h3>
      <h3>Email: {players.email}</h3>
      <h3>Gamename: {players.gamename}#{players.tagline}</h3>
      {/* <h3>Gamename: {players.gamename} | Tagline: {players.tagline}</h3> */}

      <h2>My Game Info</h2>
    </Container>
    
  )
};

export default AccountInfoPage;
