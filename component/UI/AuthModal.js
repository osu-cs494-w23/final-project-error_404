import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Fragment, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "@/store/modal";
import classes from "./AuthModal.module.css";
import { signIn } from "next-auth/react"
import Alert from "react-bootstrap/Alert";


async function createUser(username, email, password, tagline, gamename) {
  console.log("Here - createuser")
  const res = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password, tagline, gamename }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log(res)
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

const AuthModal = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.modal.isShow);
  const [isSignIn, setSignIn] = useState(true);
  const [isExisting, setExisting] = useState(false);
  const [error, setError] = useState(false)

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const taglineInputRef = useRef();
  const gamenameInputRef = useRef();

  const authStateHandler = () => {
    setSignIn((prevState) => !prevState);
    
  };

  const showHandler = () => {
    dispatch(modalAction.changeModalState());
  };

  const SignupHandler = async (e) => {
    console.log("Click");

    e.preventDefault();

    setExisting(false);
    
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredTagline = taglineInputRef.current.value;
    const enteredGamename = gamenameInputRef.current.value;

    try {
      await createUser(enteredUsername, enteredEmail, enteredPassword, enteredTagline, enteredGamename);
    } catch (e) {
      console.log(e);
      
      if(e.message === "User already exists")
      {
        setExisting(true);
        return
      }
    }
  
    setSignIn(true);


  
  };

  const SigninHandler = async (e) => {
    e.preventDefault()
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn('credentials', { redirect: false, email: enteredEmail, password: enteredPassword });

    console.log(result)
    
    if (!result.error){
      dispatch(modalAction.changeModalState())
      setError(false)
    }
    else{
      setError(true)
    }
    console.log("Clicked Sign In")

  };

  return (
    <Fragment>
      <Modal show={isShow} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton onClick={showHandler}>
          <Modal.Title>{isSignIn ? "Sign In" : "Create Account"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={isSignIn ? SigninHandler : SignupHandler}>
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  ref={usernameInputRef}
                  required
                />
              </Form.Group>
            )}
             {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicGamename">
                <Form.Label>GameName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Gamename"
                  ref={gamenameInputRef}
                  required
                />
                
              </Form.Group>
            )}
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicTagline">
                <Form.Label>Tagline</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tagline"
                  ref={taglineInputRef}
                  required
                />
                <Form.Text className="text-muted">
                eg. 1234 - no '#' needed
              </Form.Text>
              </Form.Group>
            )}
           
           {error && isSignIn && <Alert key="danger" variant="danger">Incorrect credentials</Alert>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailInputRef}
                required
              />
              <Form.Text className="text-muted">
                {isExisting && !isSignIn && "User already exists"}
                {!isExisting &&"Use valid email address"}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
                required
              />

              <Form.Text className="text-muted">
                Password must be at least 7 characters
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button className={classes.btn} onClick={authStateHandler}>
                {isSignIn ? "Create Account" : "Sign In"}
              </Button>
              <div className="d-flex gap-2">
                <Button
                  className={classes.btn_close}
                  variant="light"
                  onClick={showHandler}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className={classes.btn_submit}
                  variant="dark"
                >
                  {isSignIn ? "Sign In" : "Sign Up"}
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default AuthModal;
