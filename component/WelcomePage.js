import { useState } from "react";
import Container from "react-bootstrap/Container";
import classes from "./WelcomePage.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import useAgentsList from "./Hooks/useAgentsList";
import useWeapons from "./Hooks/useWeapons";
import Link from 'next/link'


const WelcomePage = () => {
  const [agents, loading, error] = useAgentsList();

  const [Weapons, loading2, error2] = useWeapons();

  const [query, setQuery] = useState("");

  const [filterAgent, setFilterAgent] = useState([]);
  const [filterWeapon, setFilterWeapon] = useState([]);

  const queryHandler = (e) => {
    setQuery(e.target.value);

    if (agents) {
      setFilterAgent(
        agents.data.filter((agent) =>
          agent.displayName.toUpperCase().includes(query.toUpperCase())
        )
      );
    }

    if (Weapons) {
      setFilterWeapon(
        Weapons.filter((weapon) =>
          weapon.displayName.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  };

  return (
    <Container>
      <div className={classes.center}>
        <div>
          <h1 className={classes.title}>Valorant</h1>
        </div>

        <div className={classes.search_group}>
          <div>
            <input
              placeholder="Search For Agent/Weapons"
              value={query}
              onChange={queryHandler}
            />
          </div>

          <div>
            {query.length != 0 && (
              <Dropdown.Menu show className={classes.dropdown}>
                <Dropdown.Header>Weapons</Dropdown.Header>
                {filterWeapon.map((weapon) => {
                  return (
                    <Dropdown.Item key={weapon.uuid} as={Link} href={`/weapons/${weapon.displayName}`}>
                      {weapon.displayName}
                    </Dropdown.Item>
                  );
                })}

        
                <Dropdown.Divider />
                <Dropdown.Header>Agent</Dropdown.Header>
                {filterAgent.map((agent) => {
                  return (
                    <Dropdown.Item key={agent.uuid} as={Link} href={`/agents?charName=${agent.displayName}`}> 
                      {agent.displayName} 
                    </Dropdown.Item>
                  );
                }) }
              </Dropdown.Menu>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WelcomePage;
