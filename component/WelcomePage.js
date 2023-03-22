import { Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import classes from "./WelcomePage.module.css";
import ReactRotatingText from "react-rotating-text";
import Dropdown from "react-bootstrap/Dropdown";
import useAgentsList from "./Hooks/useAgentsList";
import useWeapons from "./Hooks/useWeapons";

const WelcomePage = () => {

  const Agent = useAgentsList();

  console.log(Agent);
 
  const Weapons = useWeapons();
  console.log(Weapons);

  const [query, setQuery] = useState("");

  const queryHandler = (e) => {

    setQuery(e.target.value)
    
  }

  console.log(query)

  return (
    <Container>
      <div className={classes.center}>
        <div>
          <h1 className={classes.title}>Valorant</h1>
        </div>

        <div className={classes.search_group}>
          <div>
            <input placeholder="Search For Agent/Weapons" value={query} onChange={queryHandler}/>
          </div>

          <div>
            <Dropdown.Menu show className={classes.dropdown}>
              <Dropdown.Header>Weapons</Dropdown.Header>

              <Dropdown.Divider />
              <Dropdown.Header>Agent</Dropdown.Header>

            </Dropdown.Menu>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WelcomePage;
