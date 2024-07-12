import { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import PermissionWidgetChoice from "../../permissions/widgets/PermissionWidgetChoice";
import { UtilStateContextBase } from "../../utils/states/contexts";
import {
  ROLE_DATA_INIT,
  ROLE_FIELD_GUIDE,
  ROLE_FIELD_VALIDATION,
} from "../states/constants";
import useDetail from "../../utils/hooks/useDetail.jsx";

const RolePageUpdate = () => {
  const context = useContext(UtilStateContextBase);
  const navigate = useNavigate();
  const { id } = useParams();
  const roleDetail = useDetail(
    ["roles"],
    ROLE_DATA_INIT,
    ROLE_FIELD_GUIDE,
    ROLE_FIELD_VALIDATION
  );

  useEffect(() => {
    roleDetail.onGet(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, context.auth.isAuthenticated]);

  return (
    <>
      <Container className="mt-3">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between">
            <h4>Update Role</h4>
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
                    value={roleDetail.state.name}
                    onChange={roleDetail.input.handler}
                  />
                  <ManagerWidgetGuide guide={roleDetail.guide} field={"name"} />
                  <ManagerWidgetValidation
                    messages={roleDetail.validation.get("name")}
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
                  messages={roleDetail.validation.get("accessList")}
                />
              }
              accessList={roleDetail.state.accessList}
              callback={(permission, checked) => {
                if (checked) {
                  roleDetail.setState((values) => ({
                    ...values,
                    accessList: Array.from(
                      new Set([...values.accessList, permission.access])
                    ),
                  }));
                } else {
                  roleDetail.setState((values) => {
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
              roleDetail.onUpdate(id).then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default RolePageUpdate;
