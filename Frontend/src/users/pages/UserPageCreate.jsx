import { useNavigate } from "react-router-dom";
import {
  USER_DATA_INIT,
  USER_FIELD_GUIDE,
  USER_FIELD_VALIDATION,
} from "../states/constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import RoleWidgetChoice from "../../roles/widgets/RoleWidgetChoice";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";
import useCreate from "../../utils/hooks/useCreate.jsx";

const UserPageCreate = () => {
  const navigate = useNavigate();
  const userCreate = useCreate(
    ["users"],
    USER_DATA_INIT,
    USER_FIELD_GUIDE,
    USER_FIELD_VALIDATION
  );

  return (
    <>
      <Container className="mt-3">
        <Row className="mb-3">
          <Col>
            <h3>New User</h3>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Basic Information</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    type="text"
                    minLength={3}
                    value={userCreate.state.firstName}
                    onChange={userCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={userCreate.guide}
                    field={"firstName"}
                  />
                  <ManagerWidgetValidation
                    messages={userCreate.validation.get("firstName")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    type="text"
                    minLength={3}
                    value={userCreate.state.lastName}
                    onChange={userCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={userCreate.guide}
                    field={"lastName"}
                  />
                  <ManagerWidgetValidation
                    messages={userCreate.validation.get("lastName")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>User Account</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    required
                    minLength={3}
                    value={userCreate.state.email}
                    onChange={userCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={userCreate.guide}
                    field={"email"}
                  />
                  <ManagerWidgetValidation
                    messages={userCreate.validation.get("email")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    required
                    minLength={3}
                    value={userCreate.state.password}
                    onChange={userCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={userCreate.guide}
                    field={"password"}
                  />
                  <ManagerWidgetValidation
                    messages={userCreate.validation.get("password")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>User Status</Form.Label>
                  <Form.Check
                    name="isSuperuser"
                    type="checkbox"
                    label={"Is Superuser?"}
                    defaultChecked={userCreate.state.isSuperuser}
                    onChange={userCreate.input.handler}
                  />
                  <Form.Check
                    inline
                    name="isActive"
                    type="checkbox"
                    label={"Is Active?"}
                    value={userCreate.state.isActive}
                    defaultChecked={userCreate.state.isActive}
                    onChange={userCreate.input.handler}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <RoleWidgetChoice
              messageComponent={
                <ManagerWidgetValidation
                  messages={userCreate.validation.get("role")}
                />
              }
              callback={({ _id }) => {
                userCreate.setState((values) => ({
                  ...values,
                  role: _id,
                }));
              }}
              roleID={userCreate.state.role}
            />
          </Col>
        </Row>
      </Container>

      <ManagerWidgetAction>
        <>
          <Button variant="outline-dark" onClick={() => navigate("../")}>
            Back
          </Button>
          <Button
            onClick={() => {
              userCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save User
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default UserPageCreate;
