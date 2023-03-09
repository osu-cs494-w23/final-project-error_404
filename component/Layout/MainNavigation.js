import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isAuthIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isAuthIn);
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
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
              {" "}
              Who Are We{" "}
            </Nav.Link>
          </Nav>
          {isAuthIn && (
            <Navbar.Text>
              Signed in as: <a href="/login">Mark Otto</a>
            </Navbar.Text>
          )}
          <Nav className="d-flex gap-2">
            <Nav.Item>{!isAuthIn && <Button variant="outline-light"> Sign In</Button>}</Nav.Item>

            <Nav.Item>{!isAuthIn && <Button variant="outline-light"> Sign Up</Button>}</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomePage;
