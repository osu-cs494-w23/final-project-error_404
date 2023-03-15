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
          <h1 className={classes.title}>
            Valorant  
          </h1>
          <h1 className={classes.subtitle}>
          <ReactRotatingText items={["Tracker"]} />
          </h1>
        </div>
        <div>
          <input></input>
        </div>
      </div>
    </Container>
  );
};

export default WelcomePage;
