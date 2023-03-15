import MainNavigation from "./MainNavigation";
import Container from "react-bootstrap/Container";
import AuthModal from "../UI/AuthModal";
import classes from "../Layout/Layout.module.css";
import { Fragment } from "react";

function Layout(props) {
  return (
    <div className={classes.container_div}>
      <MainNavigation />
      
        {props.children}

        <AuthModal />
        
    </div>
  );
}

export default Layout;
