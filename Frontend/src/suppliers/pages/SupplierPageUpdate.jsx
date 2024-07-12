import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import { useNavigate, useParams } from "react-router-dom";
import useDetail from "../../utils/hooks/useDetail";
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

const SupplierPageUpdate = () => {
  const context = useContext(UtilStateContextBase);
  const navigate = useNavigate();
  const { id } = useParams();
  const supplierUpdate = useDetail(
    ["suppliers"],
    SUPPLIER_DATA_INIT,
 SUPPLIER_FIELD_GUIDE,
 SUPPLIER_FIELD_VALIDATION
  );

  useEffect(() => {
    console.log(id);
    supplierUpdate.onGet(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, context.auth.isAuthenticated]);

  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"Update Supplier"} />
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
                    value={supplierUpdate.state.kode_supp}
                    readOnly
                  />
                  <ManagerWidgetGuide
                    guide={supplierUpdate.guide}
                    field={"kode_supp"}
                  />
                  <ManagerWidgetValidation
                    messages={supplierUpdate.validation.get("kode_supp")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name Supplier</Form.Label>
                  <Form.Control
                    name="name_supp"
                    type="text"
                    required
                    minLength={3}
                    value={supplierUpdate.state.name_supp}
                    onChange={supplierUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={supplierUpdate.guide}
                    field={"name_supp"}
                  />
                  <ManagerWidgetValidation
                    messages={supplierUpdate.validation.get("name_supp")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat </Form.Label>
                  <Form.Control
                    name="alamat_supp"
                    type="text"
                    required
                    minLength={3}
                    value={supplierUpdate.state.alamat_supp}
                    onChange={supplierUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={supplierUpdate.guide}
                    field={"alamat_supp"}
                  />
                  <ManagerWidgetValidation
                    messages={supplierUpdate.validation.get("alamat_supp")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>No Hp</Form.Label>
                  <Form.Control
                    name="nohp_supp"
                    type="text"
                    required
                    value={supplierUpdate.state.nohp_supp || ""}
                    onChange={supplierUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={supplierUpdate.guide}
                    field={"nohp_supp"}
                  />
                  <ManagerWidgetValidation
                    messages={supplierUpdate.validation.get("nohp_supp")}
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
              supplierUpdate.onUpdate(id).then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default SupplierPageUpdate;
