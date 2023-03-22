import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "@/store/modal";
import { PersonFill } from "react-bootstrap-icons";
import classes from "./MainNavigation.module.css";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const { data: session, status } = useSession();

  console.log(status)
  const router = useRouter();

  const isAuthIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(modalAction.changeModalState());
  };
  

  const logOutHandler = async ()  => {

    const data = await signOut({ redirect: false, callbackUrl: `/` })
    router.push(data.url)


  }


  return (
    <div className={classes.navbar}>
      <Navbar bg="transparent" expand="lg" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Navbar.Brand as={Link} href="/">
              Valorant Tracker
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} href="/leaderboard">
                Leaderboard
              </Nav.Link>
              <Nav.Link as={Link} href="/agents">
                Agents
              </Nav.Link>
              <Nav.Link as={Link} href="/weapons">
                Weapons
              </Nav.Link>
              <Nav.Link as={Link} href="/about">
                Who Are We
              </Nav.Link>
            </Nav>
            {isAuthIn && (
              <Navbar.Text>
                Signed in as: <a href="/login">Mark Otto</a>
              </Navbar.Text>
            )}
            <Nav >
              <Nav.Item className="d-flex gap-3">
                {!session && (
                  <Button variant="outline-light" onClick={openModal}>
                    Account <PersonFill size={20} />{" "}
                  </Button>
                )}

                {session && (
                  <Button variant="outline-light" as={Link} href="/account">
                    Profile
                  </Button>
                )}

                {session && (
                  <Button variant="outline-light" onClick={logOutHandler}>Logout</Button>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HomePage;
