import { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./WelcomePage.module.css";
import ReactRotatingText from "react-rotating-text";

const WelcomePage = () => {
  return (
    <Container>
      <div className={classes.center}>
        <div>
          <h1>
            <ReactRotatingText items={["Valorant", "Tracker"]} />
          </h1>
        </div>
        <div>
          <h1>Search Bar</h1>
        </div>
      </div>
    </Container>
  );
};

export default WelcomePage;
