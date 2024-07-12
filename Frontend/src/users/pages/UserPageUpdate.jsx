import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
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
import useDetail from "../../utils/hooks/useDetail.jsx";

const UserPageUpdate = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const userDetail = useDetail(
    ["users"],
    USER_DATA_INIT,
    USER_FIELD_GUIDE,
    USER_FIELD_VALIDATION
  );

  useEffect(() => {
    userDetail.onGet(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

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
                    value={userDetail.state.firstName}
                    onChange={userDetail.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={userDetail.guide}
                    field={"firstName"}
                  />
                  <ManagerWidgetValidation
                    messages={userDetail.validation.get("firstName")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    type="text"
                    minLength={3}
                    value={userDetail.state.lastName}
                    onChange={userDetail.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={userDetail.guide}
                    field={"lastName"}
                  />
                  <ManagerWidgetValidation
                    messages={userDetail.validation.get("lastName")}
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
                    value={userDetail.state.email}
                    onChange={userDetail.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={userDetail.guide}
                    field={"email"}
                  />
                  <ManagerWidgetValidation
                    messages={userDetail.validation.get("email")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    required
                    minLength={3}
                    value={userDetail.state.password || ""}
                    onChange={userDetail.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={userDetail.guide}
                    field={"password"}
                  />
                  <ManagerWidgetValidation
                    messages={userDetail.validation.get("password")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    User Status {userDetail.state.isActive.toString()}
                  </Form.Label>
                  <Form.Check
                    name="isSuperuser"
                    type="checkbox"
                    label={"Is Superuser?"}
                    checked={userDetail.state.isSuperuser}
                    onChange={userDetail.input.handler}
                  />
                  <Form.Check
                    name="isActive"
                    type="checkbox"
                    label={"Is Active?"}
                    checked={userDetail.state.isActive}
                    onChange={userDetail.input.handler}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <RoleWidgetChoice
              messageComponent={
                <ManagerWidgetValidation
                  messages={userDetail.validation.get("role")}
                />
              }
              callback={({ _id }) => {
                userDetail.setState((values) => ({
                  ...values,
                  role: _id,
                }));
              }}
              roleID={userDetail.state.role}
            />
          </Col>
        </Row>
      </Container>

      <ManagerWidgetAction>
        <>
          <Button variant="outline-dark" onClick={() => navigate("../")}>
            Back
          </Button>
          <Button onClick={() => userDetail.onUpdate(email, null)}>
            Save User
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default UserPageUpdate;
