import classes from "./AboutPage.module.css";
import { useMediaQuery } from 'react-responsive'

const AboutPage = () => {

  //responsive 
  const isWideScreen = useMediaQuery({ query: '(min-width: 1200px)' })

  return <>
    <div className={classes.big_container}>
      <h1 className={classes.main_title}>ABOUT US</h1>

      {isWideScreen?
        <div className={classes.section}>
          <div className={classes.lefty}>
            <h3 className={classes.subtitle}>Who are we</h3>
            <p>We are ERROR_404 Not found Team from Oregon State University and this website is our final project for Advance web development class (CS494) Winter 2023. This project developed by using NextJs and React with other techniques we learned in class such as Redux, JSX, and hook. In additional, we also included other techniques we learned in the previous classes such as MongoDB and CSS.</p>
          </div>
          <div className={classes.teamLogo}>
            <h2 className={classes.logoFont}>- 404 -</h2>
            <h2 className={classes.logoFont}>Not Found</h2>
          </div>
        </div>
      :
        <div className={classes.section}>
          <div>
            <h3 className={classes.subtitle}>Who are we</h3>
            <p>We are ERROR_404 Not found Team from Oregon State University and this website is our final project for Advance web development class (CS494) Winter 2023. This project developed by using NextJs and React with other techniques we learned in class such as Redux, JSX, and hook. In additional, we also included other techniques we learned in the previous classes such as MongoDB and CSS.</p>
          </div>
        </div>
      }

      {isWideScreen?
        <div className={classes.section}>
          <div className={classes.lefty}>
            <h3 className={classes.subtitle}>About Website</h3>
            <p>Our website is the Valorant Game information website which allow user to find general information about the game such as the leaderboard, the playable characters, and the weapons. User can create the account on our website to see their game profile also.</p>
          </div>
          <div>
            <img className={classes.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/640px-Valorant_logo_-_pink_color_version.svg.png" alt="valorant_logo"></img>
          </div>
        </div>
      :
        <div className={classes.section}>
          <div className={classes.lefty}>
            <h3 className={classes.subtitle}>About Website</h3>
            <p>Our website is the Valorant Game information website which allow user to find general information about the game such as the leaderboard, the playable characters, and the weapons. User can create the account on our website to see their game profile also.</p>
          </div>
        </div>
      }

      {isWideScreen ? 
        <div className={classes.sectionL}>
          <h3 className={classes.subtitle}>Meet Our Member</h3>
          <div className={classes.teamListA}>
            <h5>Hunter Sutton</h5>
            <h5>Lyhong Peou</h5>
            <h5>Noe Campos</h5>
            <h5>Thanaruch Chaisupat</h5>
          </div>
        </div>
      :
        <div className={classes.sectionL}>
          <h3 className={classes.subtitle}>Meet Our Member</h3>
          <div className={classes.teamListB}>
            <h5>- Hunter Sutton -</h5>
            <h5>- Lyhong Peou -</h5>
            <h5>- Noe Campos -</h5>
            <h5>- Thanaruch Chaisupat -</h5>
          </div>
        </div>
      }

    </div>
  </>
};

export default AboutPage;
