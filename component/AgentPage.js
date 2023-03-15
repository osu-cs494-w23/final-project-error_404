import useAgentsList from "./Hooks/useAgentsList";
//import Spinner from "./UI/Spinner";
//import ErrorContainer from "./UI/ErrorContainer";
import classes from "./AgentPage.module.css";

const AgentPage = () => {

    const [ agents , loading , error ] = useAgentsList();
    //debug zone
    // if(agents){
    //     console.log(agents.data[0].displayName)
    // }

    if(loading)
        return <h1>Loading</h1>
    
    if(error)
        return <h1>Error with fetching data</h1>

    if(agents){
        return (
            <>
                {/* <h3>{agents.data[0].displayName}</h3>
                <h5>{agents.data[0].description}</h5>
                <img className={classes.charIcon} src={agents.data[0].displayIcon} alt={agents.data[0].displayName+"_icon"}></img>
                <img className={classes.charPic} src={agents.data[0].fullPortrait} alt={agents.data[0].displayName+"_picture"}></img>
                <h5>{agents.data[0].role.displayName}</h5>
                <h4>Ability:</h4>
                <h5>ability 1 : {agents.data[0].abilities[0].displayName}</h5>
                <img className={classes.slotIcon} src={agents.data[0].abilities[0].displayIcon} alt={agents.data[0].displayName+"_A1Icon"}></img>
                <h6>{agents.data[0].abilities[0].description}</h6>
                <h5>ability 2 : {agents.data[0].abilities[1].displayName}</h5>
                <img className={classes.slotIcon} src={agents.data[0].abilities[1].displayIcon} alt={agents.data[0].displayName+"_A2Icon"}></img>
                <h6>{agents.data[0].abilities[1].description}</h6>
                <h5>Grenade : {agents.data[0].abilities[2].displayName}</h5>
                <img className={classes.slotIcon} src={agents.data[0].abilities[2].displayIcon} alt={agents.data[0].displayName+"_GreIcon"}></img>
                <h6>{agents.data[0].abilities[2].description}</h6>
                <h5>Ultimate : {agents.data[0].abilities[3].displayName}</h5>
                <img className={classes.slotIcon} src={agents.data[0].abilities[3].displayIcon} alt={agents.data[0].displayName+"_UltIcon"}></img>
                <h6>{agents.data[0].abilities[3].description}</h6>
                <h1>.............................++.............................</h1> */}

                {Object.values(agents.data).map((char)=>(
                    <div key={char.uuid}>
                        <h3>{char.displayName}</h3>
                        <h5>{char.description}</h5>
                        <img className={classes.charIcon} src={char.displayIcon} alt={char.displayName+"_icon"}></img>
                        <img className={classes.charPic} src={char.fullPortrait} alt={char.displayName+"_picture"}></img>
                        {/* {console.log(char.role.displayName)} */}
                        <h4>Ability:</h4>
                        <h5>Q : {char.abilities[0].displayName}</h5>
                        <img className={classes.slotIcon} src={char.abilities[0].displayIcon} alt={char.displayName+"_A1Icon"}></img>
                        <h6>{char.abilities[0].description}</h6>
                        <h5>E : {char.abilities[1].displayName}</h5>
                        <img className={classes.slotIcon} src={char.abilities[1].displayIcon} alt={char.displayName+"_A2Icon"}></img>
                        <h6>{char.abilities[1].description}</h6>
                        <h5>C : {char.abilities[2].displayName}</h5>
                        <img className={classes.slotIcon} src={char.abilities[2].displayIcon} alt={char.displayName+"_GreIcon"}></img>
                        <h6>{char.abilities[2].description}</h6>
                        <h5>X : {char.abilities[3].displayName}</h5>
                        <img className={classes.slotIcon} src={char.abilities[3].displayIcon} alt={char.displayName+"_UltIcon"}></img>
                        <h6>{char.abilities[3].description}</h6>
                        <h1>.............................++.............................</h1>
                    </div>
                ))}

            </>
        )
    }
  };
  
  export default AgentPage;