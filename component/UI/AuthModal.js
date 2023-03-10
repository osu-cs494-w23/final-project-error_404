import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "@/store/modal";
import classes from "./AuthModal.module.css"

const AuthModal = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.modal.isShow);
  const [isSignIn, setSignIn] = useState(true);

  const authStateHandler = () => {
    setSignIn((prevState) => {
      if (prevState === true) {
        return false;
      } else if (prevState === false) {
        return true;
      }
    });
  };

  const showHandler = () => {
    dispatch(modalAction.changeModalState());
  };

  return (
    <Fragment>
      <Modal show={isShow} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton onClick={showHandler}>
          <Modal.Title>{isSignIn ? "Sign In" : "Create Account"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                Use valid email address
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            

          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">

        <Button className={classes.btn} onClick={authStateHandler}>{isSignIn ? "Create Account" : "Sign In"}</Button>
          <div className="d-flex gap-2">
            <Button className={classes.btn_close} variant="light" onClick={showHandler}>
              Close
            </Button>
            <Button className={classes.btn_submit} variant="dark">{isSignIn ? "Sign In" : "Sign Up"}</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default AuthModal;
