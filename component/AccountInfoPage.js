import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useDB from "./Hooks/useDB";
import { Container } from "react-bootstrap";


const AccountInfoPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  //const [email, setEmail ] = useState("")
  // const [username, setUsername] = useState("")
  // const [tagline, setTagline ] = useState("")
  // const [gamename, setGamename] = useState("")

  let email = ""
  
  if(session && status === "authenticated"){
    // setEmail( session.user.email)
    email = session.user.email
    
  }
  const [ players , loading , error ] = useDB(email)
  console.log(players)
  //console.log(email)
  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  if (status === `unauthenticated`) {
    router.push(`/`);
  }

  return (
    <Container>
      <p> Welcome to the Account Page</p>
    </Container>
    
  )
};

export default AccountInfoPage;
