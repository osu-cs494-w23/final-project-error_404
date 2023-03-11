import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Fragment, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "@/store/modal";
import classes from "./AuthModal.module.css";

async function createUser(username, email, password) {


  const res = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify({username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log(data);

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

const AuthModal = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.modal.isShow);
  const [isSignIn, setSignIn] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const authStateHandler = () => {
    setSignIn((prevState) => !prevState);
  };

  const showHandler = () => {
    dispatch(modalAction.changeModalState());
  };

  const SignupHandler = async (e) => {

    console.log("Click");

    e.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      await createUser(enteredUsername,enteredEmail, enteredPassword);
      
    } catch (e) {
      console.log(e);
    }
  };

  const SigninHandler = async (e) => {};

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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailInputRef}
                required
              />
              <Form.Text className="text-muted">
                Use valid email address
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
