import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import { useNavigate, useParams } from "react-router-dom";
import useDetail from "../../utils/hooks/useDetail";
import {
  DEPT_DATA_INIT,
  DEPT_FIELD_GUIDE,
  DEPT_FIELD_VALIDATION,
} from "../states/constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";

const DeptPageUpdate = () => {
  const context = useContext(UtilStateContextBase);
  const navigate = useNavigate();
  const { id } = useParams();
  const deptUpdate = useDetail(
    ["depts"],
    DEPT_DATA_INIT,
    DEPT_FIELD_GUIDE,
    DEPT_FIELD_VALIDATION
  );

  useEffect(() => {
    console.log(id);
    deptUpdate.onGet(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, context.auth.isAuthenticated]);

  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"Update Departemen"} />
        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
              <Form.Group className="mb-3">
                  <Form.Label>Kode Departemen</Form.Label>
                  <Form.Control
                    name="kode_dept"
                    type="text"
                    required
                    minLength={3}
                    value={deptUpdate.state.kode_dept}
                    readOnly
                  />
                  <ManagerWidgetGuide
                    guide={deptUpdate.guide}
                    field={"kode_dept"}
                  />
                  <ManagerWidgetValidation
                    messages={deptUpdate.validation.get("kode_dept")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name Departemen</Form.Label>
                  <Form.Control
                    name="name_dept"
                    type="text"
                    required
                    minLength={3}
                    value={deptUpdate.state.name_dept}
                    onChange={deptUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={deptUpdate.guide}
                    field={"name_dept"}
                  />
                  <ManagerWidgetValidation
                    messages={deptUpdate.validation.get("name_dept")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pimpinan Departemen</Form.Label>
                  <Form.Control
                    name="pimpinan"
                    type="text"
                    required
                    minLength={3}
                    value={deptUpdate.state.pimpinan}
                    onChange={deptUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={deptUpdate.guide}
                    field={"pimpinan"}
                  />
                  <ManagerWidgetValidation
                    messages={deptUpdate.validation.get("pimpinan")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>No Hp</Form.Label>
                  <Form.Control
                    name="nohp_dept"
                    type="text"
                    required
                    value={deptUpdate.state.nohp_dept || ""}
                    onChange={deptUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={deptUpdate.guide}
                    field={"nohp_dept"}
                  />
                  <ManagerWidgetValidation
                    messages={deptUpdate.validation.get("nohp_dept")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
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
              deptUpdate.onUpdate(id).then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default DeptPageUpdate;
