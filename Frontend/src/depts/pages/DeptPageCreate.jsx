import { useNavigate } from "react-router-dom";
import useCreate from "../../utils/hooks/useCreate";
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
import useAutoIncrement from "../../utils/hooks/useAutoIncrement";
import { useEffect } from "react";

const DeptPageCreate = () => {
  const navigate = useNavigate();
  const deptCreate = useCreate(
    ["depts"],
    DEPT_DATA_INIT,
    DEPT_FIELD_GUIDE,
    DEPT_FIELD_VALIDATION,
  );

  const autoIncrement = useAutoIncrement(['depts', 'autoincrement']);

  useEffect(() => {
    autoIncrement.getKode().then((data) => {
      deptCreate.setState((values) => ({...values, kode_dept: data.kode}))
    })
  }, [])

  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"New Departemen"} />

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
                    value={deptCreate.state.kode_dept}
                    onChange={deptCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={deptCreate.guide}
                    field={"kode_dept"}
                  />
                  <ManagerWidgetValidation
                    messages={deptCreate.validation.get("kode_dept")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name Departemen</Form.Label>
                  <Form.Control
                    name="name_dept"
                    type="text"
                    required
                    minLength={3}
                    value={deptCreate.state.name_dept}
                    onChange={deptCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={deptCreate.guide}
                    field={"name_dept"}
                  />
                  <ManagerWidgetValidation
                    messages={deptCreate.validation.get("name_dept")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pimpinan Departemen</Form.Label>
                  <Form.Control
                    name="pimpinan"
                    type="text"
                    required
                    minLength={3}
                    value={deptCreate.state.pimpinan}
                    onChange={deptCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={deptCreate.guide}
                    field={"pimpinan"}
                  />
                  <ManagerWidgetValidation
                    messages={deptCreate.validation.get("pimpinan")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>No Hp</Form.Label>
                  <Form.Control
                    name="nohp_dept"
                    type="text"
                    required
                    value={deptCreate.state.nohp_dept || ""}
                    onChange={deptCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={deptCreate.guide}
                    field={"nohp_dept"}
                  />
                  <ManagerWidgetValidation
                    messages={deptCreate.validation.get("nohp_dept")}
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
              deptCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default DeptPageCreate;
