import useUser from "../../utils/hooks/useUser.jsx";
import {
  USER_DATA_INIT,
  USER_FIELD_GUIDE,
  USER_FIELD_VALIDATION,
} from "../states/constants.jsx";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide.jsx";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation.jsx";

const UserPageSignIn = () => {
  const userSignIn = useUser(
    ["users", "signin"],
    USER_DATA_INIT,
    USER_FIELD_GUIDE,
    USER_FIELD_VALIDATION
  );

  return (
    <Container>
      <Row
        className={"d-flex justify-content-center align-items-center vh-100"}
      >
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Sign In</Card.Title>
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
                <ManagerWidgetValidation
                  messages={userSignIn.validation.get("email")}
                />
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
                <ManagerWidgetGuide
                  guide={userSignIn.guide}
                  field={"password"}
                />
                <ManagerWidgetValidation
                  messages={userSignIn.validation.get("password")}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => userSignIn.onSignIn(null)}>Sign In</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPageSignIn;
