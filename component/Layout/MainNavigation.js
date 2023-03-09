import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";

const HomePage = () => {
  return (
    <Navbar bg="dark" variant="dark">
       <Container>
          <Navbar.Brand as={Link} href="/">
            Valorant Tracker
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link  as={Link} href="/">Home</Nav.Link>
            <Nav.Link  as={Link} href="/leaderboard">Leaderboard</Nav.Link>
            <Nav.Link  as={Link} href="/agents">Agents</Nav.Link>
            <Nav.Link  as={Link} href="/weapons">Weapons</Nav.Link>
            <Nav.Link  as={Link} href="/about"> Who Are We </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default HomePage;
