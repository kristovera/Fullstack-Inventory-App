import {
  ROLE_DATA_INIT,
  ROLE_FIELD_GUIDE,
  ROLE_FIELD_VALIDATION,
} from "../states/constants";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import PermissionWidgetChoice from "../../permissions/widgets/PermissionWidgetChoice";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";
import useCreate from "../../utils/hooks/useCreate.jsx";

const RolePageCreate = () => {
  const navigate = useNavigate();
  const roleCreate = useCreate(
    ["roles"],
    ROLE_DATA_INIT,
    ROLE_FIELD_GUIDE,
    ROLE_FIELD_VALIDATION
  );

  return (
    <>
      <Container className="mt-3">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between">
            <h4>New Role</h4>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Role</Card.Title>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    required
                    minLength={3}
                    value={roleCreate.state.name}
                    onChange={roleCreate.input.handler}
                  />
                  <ManagerWidgetGuide guide={roleCreate.guide} field={"name"} />
                  <ManagerWidgetValidation
                    messages={roleCreate.validation.get("name")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <PermissionWidgetChoice
              messageComponent={
                <ManagerWidgetValidation
                  messages={roleCreate.validation.get("accessList")}
                />
              }
              accessList={roleCreate.state.accessList}
              callback={(permission, checked) => {
                if (checked) {
                  roleCreate.setState((values) => ({
                    ...values,
                    accessList: Array.from(
                      new Set([...values.accessList, permission.access])
                    ),
                  }));
                } else {
                  roleCreate.setState((values) => {
                    let copy = [...values.accessList];
                    let index = copy.findIndex(
                      (data) => data === permission.access
                    );
                    copy.splice(index, 1);
                    return { ...values, accessList: copy };
                  });
                }
              }}
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
              roleCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default RolePageCreate;
