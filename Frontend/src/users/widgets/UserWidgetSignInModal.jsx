import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import {USER_DATA_INIT, USER_FIELD_GUIDE, USER_FIELD_VALIDATION} from "../states/constants";
import { Button, Form, Modal } from "react-bootstrap";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import useUser from "../../utils/hooks/useUser.jsx";

function UserWidgetSignInModal() {
  const context = useContext(UtilStateContextBase);
  const userSignIn = useUser(['users', 'signin'], USER_DATA_INIT, USER_FIELD_GUIDE,USER_FIELD_VALIDATION);

  return (
    <>
      <Modal
        show={!context.auth.isAuthenticated}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              isInvalid={userSignIn.validation.get("email")}
              onChange={userSignIn.input.handler}
              value={userSignIn.state.email}
            />
            <ManagerWidgetGuide guide={userSignIn.guide} field={"email"} />
            <ManagerWidgetValidation messages={userSignIn.validation.get("email")} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              name="password"
              isInvalid={userSignIn.validation.get("password")}
              onChange={userSignIn.input.handler}
              value={userSignIn.state.password}
            />
            <ManagerWidgetGuide guide={userSignIn.guide} field={"password"} />
            <ManagerWidgetValidation
              messages={userSignIn.validation.get("password")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={
            () => userSignIn.onSignIn(null)
          }>
            Sign In
          </Button>
          <Button onClick={
            () => userSignIn.onSignIn(null)
          }>
            Register
          </Button>
         
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserWidgetSignInModal;
