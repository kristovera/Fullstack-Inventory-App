import { useNavigate } from "react-router-dom";
import useCreate from "../../utils/hooks/useCreate";
import {
SUPPLIER_DATA_INIT,
SUPPLIER_FIELD_GUIDE,
SUPPLIER_FIELD_VALIDATION
} from "../states/constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";
import useAutoIncrement from "../../utils/hooks/useAutoIncrement";
import { useEffect } from "react";

const SupplierPageCreate = () => {
  const navigate = useNavigate();
  const supplierCreate = useCreate(
    ["suppliers"],
SUPPLIER_DATA_INIT,
SUPPLIER_FIELD_GUIDE,
SUPPLIER_FIELD_VALIDATION
  
  );
  const autoIncrement = useAutoIncrement(['suppliers', 'autoincrement']);

  useEffect(() => {
    autoIncrement.getKode().then((data) => {
      supplierCreate.setState((values) => ({...values, kode_supp: data.kode}))
    })
  }, [])
  

  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"New Supplier"} />

        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
              <Form.Group className="mb-3">
                  <Form.Label>Kode Supplier</Form.Label>
                  <Form.Control
                    name="kode_supp"
                    type="text"
                    required
                    minLength={3}
                    value={supplierCreate.state.kode_supp}
                    onChange={supplierCreate.input.handler}
                  />
                
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name Supplier</Form.Label>
                  <Form.Control
                    name="name_supp"
                    type="text"
                    required
                    minLength={3}
                    value={supplierCreate.state.name_supp}
                    onChange={supplierCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={supplierCreate.guide}
                    field={"name_supp"}
                  />
                  <ManagerWidgetValidation
                    messages={supplierCreate.validation.get("name_supp")}
                  />
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Alamat </Form.Label>
                  <Form.Control
                    name="alamat_supp"
                    type="string"
                    required
                    value={supplierCreate.state.alamat_supp}
                    onChange={supplierCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={supplierCreate.guide}
                    field={"alamat_supp"}
                  />
                  <ManagerWidgetValidation
                    messages={supplierCreate.validation.get("alamat_supp")}
                  />
                </Form.Group>

                
                <Form.Group className="mb-3">
                  <Form.Label>No Hp</Form.Label>
                  <Form.Control
                    name="nohp_supp"
                    type="text"
                    required
                    value={supplierCreate.state.nohp_supp|| ""}
                    onChange={supplierCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={supplierCreate.guide}
                    field={"nohp_supp"}
                  />
                  <ManagerWidgetValidation
                    messages={supplierCreate.validation.get("nohp_supp")}
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
              supplierCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default SupplierPageCreate;
