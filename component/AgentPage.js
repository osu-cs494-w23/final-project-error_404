import useAgentsList from "./Hooks/useAgentsList";
//import Spinner from "./UI/Spinner";
//import ErrorContainer from "./UI/ErrorContainer";
import classes from "./AgentPage.module.css";
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import {useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive'

const AgentPage = () => {
    const router = useRouter()
    const [ agents , loading , error ] = useAgentsList();
    const [currentSelector,setSelector] = useState("");
    const [currentAbility,setAbility] = useState("Q");

    //responsive check
    const isWideScreen = useMediaQuery({ query: '(min-width: 995px)' })
    const isWidestScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    useEffect(() => {
        //console.log(router.query.charName);
        if(router.query.charName){
            setSelector(router.query.charName)
        }
    }, [router.query]);

    useEffect(() => {
        if(currentSelector)
        router.push({href:'/',query: {charName: currentSelector}})
    }, [currentSelector])
    //debug zone
    // if(agents){
    //     console.log(agents.data[0].displayName)
    // }


    if(loading)
        return  <Container>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
    
    if(error)
        return <Container>
                    <h1 className={classes.errorMes}>Error with fetching data</h1>
                </Container>        

    if(agents){
        return (
            <Container className={classes.theContainer}>
                {currentSelector ? 
                
                Object.values(agents.data).map((char)=>(
                    <div key={char.uuid+"_upper"}>
                        {
                            char.displayName.toLowerCase() == currentSelector.toLowerCase() ?
                            <div className={classes.upperContainer}>
                                {isWideScreen && 
                                <div className={classes.upperImgContainer}>
                                    <img className={classes.charPic} src={char.fullPortrait} alt={char.displayName+"_picture"}></img>
                                </div>
                                }
                                <div className={classes.upperRight}>
                                    <div className={classes.bio}>
                                        {isWideScreen && <img className={classes.charIcon} src={char.displayIcon} alt={char.displayName+"_icon"}></img>}
                                        <div className={classes.bioDetail}>
                                            <div className={classes.title}>
                                                <h1 className={classes.titleText}>{char.displayName}</h1>
                                                <img className={classes.roleIconTitle} src={char.role.displayIcon} alt={char.displayName+"_role_icon_title"}></img>
                                            </div>
                                            <h4>{char.role.displayName}</h4>
                                            <p className={classes.description}>{char.description}</p>
                                        </div>
                                    </div>
                                    <div className={classes.abilityTab}>
                                        <h4>Ability:</h4>
                                        <div className={classes.abilityBoxBox}>
                                            {(currentAbility=='Q') ? <h4 className={classes.abilityBoxS} onClick={()=>setAbility("Q")}>Q</h4> : <h4 className={classes.abilityBox} onClick={()=>setAbility("Q")}>Q</h4>}
                                            {(currentAbility=='E') ? <h4 className={classes.abilityBoxS} onClick={()=>setAbility("E")}>E</h4> : <h4 className={classes.abilityBox} onClick={()=>setAbility("E")}>E</h4>}
                                            {(currentAbility=='C') ? <h4 className={classes.abilityBoxS} onClick={()=>setAbility("C")}>C</h4> : <h4 className={classes.abilityBox} onClick={()=>setAbility("C")}>C</h4>}
                                            {(currentAbility=='X') ? <h4 className={classes.abilityBoxS} onClick={()=>setAbility("X")}>X</h4> : <h4 className={classes.abilityBox} onClick={()=>setAbility("X")}>X</h4>}
                                        </div>
                                    </div>
                                    
                                    <div className={classes.abilityDetail}>
                                        <>
                                        {
                                            (currentAbility=='Q') ?
                                                <>
                                                    {
                                                    isWidestScreen &&
                                                    <>
                                                    <h4>Q</h4>
                                                    <img className={classes.slotIcon} src={char.abilities[0].displayIcon} alt={char.displayName+"_AIcon"}></img>
                                                    <h4>{char.abilities[0].displayName}</h4>
                                                    <h4 className={classes.abilityEach}>&#10148;</h4>
                                                    </>
                                                    }
                                                    <p>{char.abilities[0].description}</p>
                                                </>
                                            : (currentAbility=='E') ?
                                                <>
                                                    {isWidestScreen && 
                                                    <>
                                                    <h4>E</h4>
                                                    <img className={classes.slotIcon} src={char.abilities[1].displayIcon} alt={char.displayName+"_AIcon"}></img>
                                                    <h4>{char.abilities[1].displayName}</h4>
                                                    <h4 className={classes.abilityEach}>&#10148;</h4>
                                                    </>
                                                    }
                                                    <p>{char.abilities[1].description}</p>
                                                </> 
                                            : (currentAbility=='C') ?
                                                <>
                                                    {isWidestScreen && 
                                                    <>
                                                    <h4>C</h4>
                                                    <img className={classes.slotIcon} src={char.abilities[2].displayIcon} alt={char.displayName+"_AIcon"}></img>
                                                    <h4>{char.abilities[2].displayName}</h4>
                                                    <h4 className={classes.abilityEach}>&#10148;</h4>
                                                    </>
                                                    }
                                                    <p>{char.abilities[2].description}</p>
                                                </>
                                            :
                                                <>
                                                    {isWidestScreen && 
                                                    <>
                                                    <h4>X</h4>
                                                    <img className={classes.slotIcon} src={char.abilities[3].displayIcon} alt={char.displayName+"_AIcon"}></img>
                                                    <h4>{char.abilities[3].displayName}</h4>
                                                    <h4 className={classes.abilityEach}>&#10148;</h4>
                                                    </>
                                                    }
                                                    <p>{char.abilities[3].description}</p>
                                                </>
                                        }
                                        </>
                                    </div>
                                </div>
                            </div>:<></>
                        }  
                    </div>           
                ))

                :

                <h1 className={classes.promptText}>Please select agent to view agent data !</h1>
                }

                <div className={classes.cardContainer}>
                    {Object.values(agents.data).map((char,i)=>(
                        // <div key={char.uuid}>
                        //     <h3>{char.displayName}</h3>
                        //     <h5>{char.description}</h5>
                        //     <img className={classes.charIcon} src={char.displayIcon} alt={char.displayName+"_icon"}></img>
                        //     <img className={classes.charPic} src={char.fullPortrait} alt={char.displayName+"_picture"}></img>
                        //     {console.log(char.role.displayName)}
                        //     <h4>Ability:</h4>
                        //     <h5>Q : {char.abilities[0].displayName}</h5>
                        //     <img className={classes.slotIcon} src={char.abilities[0].displayIcon} alt={char.displayName+"_A1Icon"}></img>
                        //     <h6>{char.abilities[0].description}</h6>
                        //     <h5>E : {char.abilities[1].displayName}</h5>
                        //     <img className={classes.slotIcon} src={char.abilities[1].displayIcon} alt={char.displayName+"_A2Icon"}></img>
                        //     <h6>{char.abilities[1].description}</h6>
                        //     <h5>C : {char.abilities[2].displayName}</h5>
                        //     <img className={classes.slotIcon} src={char.abilities[2].displayIcon} alt={char.displayName+"_GreIcon"}></img>
                        //     <h6>{char.abilities[2].description}</h6>
                        //     <h5>X : {char.abilities[3].displayName}</h5>
                        //     <img className={classes.slotIcon} src={char.abilities[3].displayIcon} alt={char.displayName+"_UltIcon"}></img>
                        //     <h6>{char.abilities[3].description}</h6>
                        //     <h1>.............................++.............................</h1>
                        // </div>

                        // <Card key={char.uuid} >
                        //     <Card.Title className={classes.test}>{char.displayName}</Card.Title>
                        //     <Card.Body><Card.Text>{char.description}</Card.Text></Card.Body>
                        // </Card>


                        
                        char.displayName.toLowerCase()==currentSelector.toLowerCase() ?
                        <div className={classes.the_card_selected} key={char.uuid}>
                            <img className={classes.charIcon} src={char.displayIcon} alt={char.displayName+"_icon"}></img>
                            <div className={classes.cardTitle}>
                                <h3>{char.displayName}</h3>
                                <img className={classes.roleIcon} src={char.role.displayIcon} alt={char.displayName+"_role_icon"}></img>
                            </div>
                        </div>
                        :
                        <div className={classes.the_card} key={char.uuid} onClick={()=>setSelector(char.displayName)}>
                            <img className={classes.charIcon} src={char.displayIcon} alt={char.displayName+"_icon"}></img>
                            <div className={classes.cardTitle}>
                                <h3>{char.displayName}</h3>
                                <img className={classes.roleIcon} src={char.role.displayIcon} alt={char.displayName+"_role_icon"}></img>
                            </div>
                        </div>
                        
                    ))}

                </div>{/*Card Container*/}
            </Container>
        )
    }
  };
  
  export default AgentPage;